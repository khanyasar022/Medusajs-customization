# MedusaJS Customization – Backend, Admin, Storefront

This repo contains a Medusa v2 backend (with Admin) and a Next.js storefront customized to:
- Add a Loyalty Points service and endpoint.
- Render Loyalty Points in the Admin Orders details.
- Add a Gift Message field in checkout and display it in Admin.

## Prerequisites
- Node.js 18+
- pnpm or npm or yarn

## 1) Backend (Medusa v2)
Location: `backend`

### Configure env (optional)
Create a `.env` in `backend` if you want to override defaults:
```
DATABASE_URL=postgres://... (or sqlite by default)
STORE_CORS=http://localhost:3000
ADMIN_CORS=http://localhost:9000,http://localhost:7001
AUTH_CORS=http://localhost:3000
JWT_SECRET=supersecret
COOKIE_SECRET=supersecret
```

### Install & run
```
cd backend
npm install
npm run dev
```
- Medusa API and Admin run on `http://localhost:9000`
- Admin UI: `http://localhost:9000/app`

## 2) Storefront (Next.js)
Location: `backend-storefront`

### Configure env
Create `.env.local` in `backend-storefront`:
```
MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=<your_publishable_key>
```
How to get a publishable key:
- Open `http://localhost:9000/app` → Settings → API Keys → Create Publishable Key
- Or use the one logged in the storefront console output if present

### Install & run
```
cd backend-storefront
npm install
npm run dev
```
- Storefront runs on `http://localhost:3000`

## Run both in parallel
Open two terminals:
- Terminal A:
```
cd backend && npm run dev
```
- Terminal B:
```
cd backend-storefront && npm run dev
```

Optional: use a single command with `concurrently` from the repo root:
```
# from repo root
npm i -g concurrently
concurrently "cd backend && npm run dev" "cd backend-storefront && npm run dev"
```

## What was added
- Backend module `loyalty` with service and API route:
  - `GET /store/orders/:id/loyalty-points` → `{ order_id, loyalty_points }`
- Admin widgets (Order details page):
  - Loyalty Points
  - Gift Message (from order metadata)
- Storefront checkout Review step:
  - Gift Message field saved to cart metadata before order completion

## Quick verification
- API health: `curl http://localhost:9000/store/regions -H "x-publishable-api-key: <key>"`
- Loyalty endpoint:
```
curl http://localhost:9000/store/orders/<order_id>/loyalty-points \
  -H "x-publishable-api-key: <key>"
```
- Admin: `http://localhost:9000/app` → Orders → Open any order
  - See “Loyalty Points” and “Gift Message” sections
- Storefront: `http://localhost:3000`
  - Checkout → Review step → add Gift Message → Save → Place Order

## Notes
- If you get 400s from `/store/*`, ensure the `x-publishable-api-key` header is set (storefront sets it via `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`).
- Seeded demo data is already created by the scaffold. Create a new order via the storefront to test loyalty points on your own order totals.
