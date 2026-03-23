# Indian Affair Restobar — Online Ordering App

A multi-page restaurant website and online ordering system for **Indian Affair Restobar**, Taupo, New Zealand.

## What it is

- **home.html** — Landing page
- **menu.html** — Full menu reference
- **index.html** — Online ordering app (pickup & delivery, curry builder, chat assistant)
- **manager.html** — Manager dashboard (accept/track orders in real-time)
- **about.html / contact.html** — Info pages
- **server.js** — Lightweight Express backend that persists orders to `data/orders.json`

## How to run

```bash
npm install
npm start
```

Server starts on **http://localhost:8080** by default. All static files are served from there.

To change the port:
```bash
PORT=3000 npm start
```

## Architecture

- Orders are saved to `data/orders.json` via `POST /orders`
- Manager dashboard polls `GET /orders` every 30 seconds and shows a **Live** indicator when connected
- If the server is unreachable, the ordering app falls back to `localStorage` automatically
- Manager can accept orders via `PATCH /orders/:id` — confirmation screen on the customer side updates automatically

## API

| Method | Path | Description |
|--------|------|-------------|
| GET | /orders | List all orders |
| POST | /orders | Create a new order |
| PATCH | /orders/:id | Update an order (e.g. accept) |
| DELETE | /orders/:id | Remove an order |

## What's left to build

- **Stripe integration** — online payment (placeholder exists in UI)
- **SMS/email notifications** — notify customer when order is accepted
- **Order history** — per-customer view with phone number lookup
- **Delivery zone logic** — restrict delivery radius or estimate fee
- **Authentication** — protect the manager dashboard with a password
- **Print tickets** — one-click kitchen print from manager dashboard
- **Push notifications** — alert manager of new orders without polling
