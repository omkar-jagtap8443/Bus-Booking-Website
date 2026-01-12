<div align="center">
	<img src="public/favicon.svg" alt="Raj Mudra Travels" width="96" />
	<h1>Raj Mudra Bus Booking</h1>
	<p>Full-stack reservation platform with live inventory, filters, and bookings.</p>
</div>

## ✨ Features

- 🔎 **Dynamic search** with origin/destination swap, date picker, and shareable URLs
- 🎛️ **Advanced filters** (bus type, departure slots, live price ceiling) with responsive UI
- 📊 **Live stats** cards powered by backend meta endpoints
- 🚌 **Rich result cards** showing amenities, boarding points, and seat availability
- 🪪 **Booking workflow** with modal checkout, reference IDs, and seat inventory updates
- 🍃 **Modular Express API** (routes, bookings, meta) + MongoDB persistence and seed script

## 🧱 Tech Stack

- Frontend: React 19 + Vite, React Router, Tailwind CSS 4 alpha, Framer Motion icons
- Backend: Express 5, Mongoose 9, MongoDB Atlas/local, Morgan, Dotenv, Nodemon

## ⚙️ Local Setup

### 1. Frontend

```bash
npm install
npm run dev
```

Create `.env` at the project root:

```
VITE_API_BASE_URL=http://localhost:4000
```

### 2. Backend

```bash
cd Backend
npm install
npm run dev
```

Backend `.env` (sample):

```
PORT=4000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/bus
CLIENT_URL=http://localhost:5173
```

To seed demo routes after configuring Mongo:

```bash
cd Backend
npm run seed
```

## 🔌 API Overview

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/api/routes` | List routes (supports `origin`, `destination`, `travelDate`, `busTypes`, `departureSlot`, `minPrice`, `maxPrice`, `sortBy`) |
| GET | `/api/routes/:id` | Fetch single route details |
| POST | `/api/routes` | (Admin) Create a new route document |
| POST | `/api/bookings` | Create a booking, deduct seats, return reference |
| GET | `/api/bookings/:reference` | Lookup booking by reference code |
| GET | `/api/meta/summary` | Aggregate stats for dashboards |

All responses are JSON. Errors return shape `{ message, stack? }`.

## 📁 Project Structure

```
bus/
├── src/                 # React application
├── Backend/             # Express API + models/controllers
├── public/              # Static assets
└── README.md
```

## ✅ Quality of Life

- CORS safelist driven by `CLIENT_URL`
- Centralized error & 404 handling
- Dedicated `SearchContext` to sync filters, URLs, and UI state
- Booking modal recalculates totals and validates seat counts in real time

## 📦 Deployment Notes

- Frontend is ready for Vercel (already has `vercel.json`). Update `VITE_API_BASE_URL` env there.
- Backend can be hosted on Render/Railway/Azure App Service. Remember to set `MONGO_URI`, `CLIENT_URL`, and align the frontend base URL accordingly.

Enjoy building on top of Raj Mudra Travels! 🧡
