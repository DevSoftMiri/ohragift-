# OHRA MERN Scaffold

This repository is structured as a MERN commerce ecosystem with one shared backend and one React frontend containing two storefronts:

- `OHRA Gifts`
- `OHRA Wears`

## Structure

```text
OHRA/
  backend/
  frontend/
```

## Run

1. `npm install`
2. `npm run dev:backend`
3. `npm run dev:frontend`

The backend serves API routes under `/api`, and the frontend is ready to connect through shared service modules.

## Admin Catalog

Open `/admin` to manage the storefront catalog. The admin workspace has separate `OHRA Gifts` and `OHRA Wears` tabs, with independent categories and product records.

Before using it, copy `backend/.env.example` to `backend/.env` and set `MONGO_URI`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `JWT_SECRET`. For local-only development, the fallback login is `admin@ohra.local` with password `ohra-admin`; change these values before deployment.
