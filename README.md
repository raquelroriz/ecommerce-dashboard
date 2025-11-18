# Kel Online Shop

Simple online shop (study project) to practice React + TypeScript with Vite and Tailwind CSS.

The focus is on building the UI and gradually adding features such as filters, favorites, cart, and authentication (UI only for now).

## Tech stack

- React 19 (TypeScript)
- Vite
- Tailwind CSS 4
- React Router 7
- ESLint

Note: there is no real backend/API yet. Products are mocked from a local file.

## Current features

- Header with:
  - Store name (links to Home).
  - Controlled search by name/type with category filters: All, Hair, Skin, Nails.
  - Favorites button with counter and dedicated route: `/favorites`.
  - Cart with badge and link to `/cart`.
  - User icon that navigates directly to the Login page (`/login`).
- Product grid (mock data) with prices in euros and product details page (`/product/:id`) with actions: add to cart and favorite.
- Basic Cart page (`/cart`).
- Authentication (UI):
  - Login page using a reusable `LoginForm` (`/login`).
  - Account creation page using `RegisterForm` (`/register`).
  - The Login page includes a link “Create one” to `/register`.
- Primary “brand” theme in violet (contrasts with the favorites heart in rose).

## How to run

Prerequisites:
- Node.js 18+

Steps:
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Open the URL printed by Vite (usually http://localhost:5173).

Production build:
```bash
npm run build
npm run preview
```

## Scripts (package.json)

- `npm run dev` — development server (Vite)
- `npm run build` — production build
- `npm run preview` — serve the local build
- `npm run lint` — ESLint

## Project structure (summary)

- `src/App.tsx` — routes and global filter state (category/search). Routes: `/`, `/favorites`, `/cart`, `/product/:id`, `/login`, `/register`.
- `src/index.css` — Tailwind v4 and theme tokens (violet brand + auxiliary palettes).
- `src/components/Header.tsx` — header with search, filters, favorites, cart, and direct link to login.
- `src/components/Favorite.tsx` — favorites provider/hook + `FavoriteToggleButton`.
- `src/components/CartContext.tsx` — cart provider/hook.
- `src/components/Card.tsx` — product card.
- `src/components/LoginForm.tsx` — reusable login form.
- `src/components/RegisterForm.tsx` — reusable account creation form.
- `src/components/UserMenu.tsx` — icon that navigates straight to `/login`.
- `src/pages/Home.tsx` — product grid with filters and empty states.
- `src/pages/ProductDetails.tsx` — product details and actions (cart/favorite).
- `src/pages/ShoppingCart.tsx` — basic cart page.
- `src/pages/Login.tsx` — page that uses `LoginForm` and links to register.
- `src/pages/Register.tsx` — page that uses `RegisterForm` and links to login.

## Color theme

- `brand-*` tokens configured to violet (violet 50–950) in `src/index.css`.
- Favorites use `rose-*`, ensuring contrast with the primary brand.

## Conventions

- Reusable components live in `src/components`.
- Route pages live in `src/pages` and mainly compose components.
- Navigation with `react-router-dom` via `<Link />` and `<Routes />`.

## Roadmap

- [x] Category filters (All/Hair/Skin/Nails) and controlled search. [2025‑11‑16]
- [x] Favorites with badge and `/favorites` route. [2025‑11‑16]
- [x] Product details page. [2025‑11‑16]
- [x] Switch primary palette to violet. [2025‑11‑18]
- [x] Login and Register pages with reusable forms; header icon goes straight to `/login`. [2025‑11‑18]
- [ ] Real product images.
- [ ] Richer cart (quantities, remove, persistence).
- [ ] Auth API integration (real login/register) and post‑login redirects.
- [ ] Deeper accessibility and responsiveness.

## Changelog

- 2025‑11‑18
  - Primary “brand” theme switched to violet (Tailwind violet 50–950) in `src/index.css`.
  - Added reusable `LoginForm` and `RegisterForm`; routes `/login` and `/register` added.
  - Simplified `UserMenu`: icon now navigates directly to `/login` (no dropdown).
- 2025‑11‑16
  - Functional search and category filters.
  - Favorites extracted to `Favorite.tsx` with `FavoriteToggleButton` and `/favorites` route.
  - Cart badge and `/cart` route; general layout with `Home` and `Footer`.
- 2025‑10‑27
  - Initial setup with Vite + React 19 + TS + Tailwind CSS 4 + React Router 7.

## Credits & references

- Icons: Heroicons — https://heroicons.com (MIT)
- Vite — https://vitejs.dev (MIT)
- Tailwind CSS — https://tailwindcss.com (MIT)
- React Router — https://reactrouter.com
- React — https://react.dev

Final notes: learning project; some parts are UI‑only. Suggestions are welcome.

Last update: 2025‑11‑18 20:07
