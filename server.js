const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const DATA_FILE = path.join(__dirname, 'data', 'orders.json');

// Ensure data directory and orders.json exist
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf8');

app.use(express.json());

// Serve static files (all the HTML, CSS, logo, etc.)
app.use(express.static(__dirname));

// ── Helpers ──────────────────────────────────────────────
function readOrders() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function writeOrders(orders) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(orders, null, 2), 'utf8');
}

// ── Routes ───────────────────────────────────────────────

// GET /menu — return the full menu
app.get('/menu', (req, res) => {
  try {
    const menu = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'menu.json'), 'utf8'));
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load menu' });
  }
});

// GET /orders — return all orders
app.get('/orders', (req, res) => {
  res.json(readOrders());
});

// POST /orders — save a new order
app.post('/orders', (req, res) => {
  const order = req.body;
  if (!order || !order.orderNumber) {
    return res.status(400).json({ error: 'Invalid order data' });
  }
  const orders = readOrders();
  // Avoid duplicates (idempotent retry)
  const exists = orders.some(o => o.orderNumber === order.orderNumber);
  if (!exists) {
    orders.push(order);
    writeOrders(orders);
  }
  res.status(201).json({ ok: true, orderNumber: order.orderNumber });
});

// PATCH /orders/:id — update an order (e.g. accept with estimatedMins)
app.patch('/orders/:id', (req, res) => {
  const orders = readOrders();
  const idx = orders.findIndex(o => o.orderNumber === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Order not found' });
  Object.assign(orders[idx], req.body);
  writeOrders(orders);
  res.json(orders[idx]);
});

// DELETE /orders/:id — remove an order
app.delete('/orders/:id', (req, res) => {
  let orders = readOrders();
  const before = orders.length;
  orders = orders.filter(o => o.orderNumber !== req.params.id);
  if (orders.length === before) return res.status(404).json({ error: 'Order not found' });
  writeOrders(orders);
  res.json({ ok: true });
});

// ── Start ─────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Indian Affair server running on http://localhost:${PORT}`);
  console.log(`Orders stored at: ${DATA_FILE}`);
});
