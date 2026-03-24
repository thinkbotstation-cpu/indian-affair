# Indian Affair Restobar — Online Ordering App (v1.0)

A multi-page restaurant website and online ordering system for **Indian Affair Restobar**, Taupo, New Zealand.

## What it is

- **home.html** — Landing page
- **menu.html** — Full menu reference (155 items, 15 categories)
- **index.html** — Online ordering app (pickup & delivery, delivery fee, chat assistant)
- **manager.html** — Password-protected manager dashboard (accept/track orders, print tickets, sound alerts)
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
| GET | /menu | Return the full menu |
| GET | /orders | List all orders |
| POST | /orders | Create a new order |
| PATCH | /orders/:id | Update an order (e.g. accept) |
| DELETE | /orders/:id | Remove an order |

## What's built

- **Manager authentication** — SHA-256 password gate on the manager dashboard (default: `manager123`), session persists via sessionStorage
- **Print tickets** — one-click kitchen print from manager dashboard with print-friendly layout
- **New order sound alerts** — Web Audio API two-tone ping when a new order arrives on the manager dashboard
- **Order status badge** — live status badge on the customer confirmation screen that polls every 15 seconds (Pending / Accepted / Offline)
- **Delivery fee** — flat $5.00 delivery fee automatically added when "Delivery" is selected, shown as a line item in cart and order summary
- **Real-time menu** — 155 items across 15 categories loaded from the server with photos from the official site
- **Chat assistant** — knowledge-base chatbot for hours, location, dietary needs, menu questions
- **Mobile-responsive** — full mobile support with touch-friendly cart drawer and navigation

## What's left to build

- **Stripe integration** — online payment (placeholder exists in UI)
- **SMS/email notifications** — notify customer when order is accepted
- **Order history** — per-customer view with phone number lookup
- **Delivery zone logic** — restrict delivery radius based on address
- **Push notifications** — real-time alerts via service worker instead of polling
