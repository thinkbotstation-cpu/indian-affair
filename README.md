# Indian Affair Restobar — Online Ordering System (v1.0)

A full-featured restaurant website and online ordering system for **Indian Affair Restobar**, Taupo, New Zealand. Built as a client-ready demo for AI/automation consulting.

## What it does

- **Customer ordering** — browse 155 real menu items across 15 categories, add to cart, choose pickup or delivery, place orders with spice level and payment preferences
- **Kitchen management** — password-protected manager dashboard with order accept/reject, status progression (Pending → Accepted → Ready → Completed), print tickets, sound alerts on new orders
- **Real-time sync** — orders persist to server with 30-second auto-refresh; falls back to localStorage if offline
- **Chat assistant** — built-in knowledge-base chatbot answering hours, location, dietary, delivery, and menu questions

## Pages

| Page | Description |
|------|-------------|
| `home.html` | Landing page with hero, features, and CTAs |
| `menu.html` | Full menu reference (read-only, 155 items with photos) |
| `index.html` | Online ordering app with cart, checkout, and confirmation |
| `contact.html` | Contact info, Google Map embed, enquiry form |
| `about.html` | Restaurant story and team info |
| `manager.html` | Kitchen dashboard (password: `manager123`) |

## How to run

```bash
npm install
npm start
```

Server starts on **http://localhost:8080**. All pages served from the same origin.

To change the port:
```bash
PORT=3000 npm start
```

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Health check (status, uptime, order count) |
| `GET` | `/menu` | Full menu (from `data/menu.json`) |
| `GET` | `/orders` | List all orders |
| `POST` | `/orders` | Create a new order |
| `PUT` | `/orders/:id/status` | Update order status (pending/accepted/ready/completed) |
| `PATCH` | `/orders/:id` | Partial update (e.g. accept with estimated time) |
| `DELETE` | `/orders/:id` | Remove an order |

## Key features

- **Order number format** — `IA-YYYYMMDD-XXXX` (e.g. `IA-20260325-4821`)
- **Status progression** — Pending → Accepted (with ETA) → Ready → Completed
- **Stats dashboard** — today's orders, pending count, active count, revenue
- **Auto-refresh** — manager dashboard polls every 30s with visual countdown
- **Sound alerts** — Web Audio API two-tone beep on new pending orders
- **Print tickets** — one-click kitchen ticket with print-friendly layout
- **Delivery support** — $5 delivery fee, address field, delivery-specific payment options
- **Mobile responsive** — full mobile support with slide-up cart drawer and touch targets
- **Chat assistant** — 20+ knowledge-base topics (hours, dietary, menu, delivery, etc.)
- **Offline fallback** — orders save to localStorage when server is unreachable
- **Favicon** — SVG data-URI favicon on all pages (no external file needed)

## Customising for a real client

1. **Menu data** — edit `data/menu.json` (name, price, category, image URL, description)
2. **Branding** — replace `logo.png`, update CSS variables in `:root` (colours)
3. **Contact info** — update address/phone in HTML footers and chat knowledge base
4. **Manager password** — change the SHA-256 hash in `manager.html` (current: `manager123`)
5. **Payments** — integrate Stripe in the `placeOrder()` function (placeholder exists)
6. **Notifications** — add SMS/email via Twilio or similar when order is accepted

## What's next

- Stripe payment integration
- SMS/email notifications on order acceptance
- Push notifications via service worker
- Delivery zone radius validation
- Per-customer order history with phone lookup
