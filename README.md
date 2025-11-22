# Kel Online Shop

Simple online shop (study project) to practice React + TypeScript with Vite and Tailwind CSS.

The focus is on building the UI and gradually adding features such as filters, favorites, cart, and authentication (UI
only for now).

## Tech stack

- React 19 (TypeScript)
- Vite
- Tailwind CSS 4
- React Router 7
- ESLint

Note: the app integrates with a public API (Makeup API) and relies solely on this API for products. There is no local data fallback.

## Current features

- Header with:
    - Store name (links to Home).
    - Controlled search by name/type with category filters: All, Eyes, Skin, Lips, Nails.
    - Favorites button with counter and dedicated route: `/favorites`.
    - Cart with badge and link to `/cart`.
    - User menu: when signed out, shows a Login icon (links to `/login`); when signed in, shows an avatar with the first letter and a dropdown with “Sign out”. No Checkout link in the header.
- Product grid loaded directly from Makeup API and product details page (`/product/:id`) with actions: add to cart and favorite.
    - Cards are NOT rendered for products without a valid image.
    - Image URLs are normalized to HTTPS; `<img>` has lazy loading and safe fallback.
    - On Product Details the image is intentionally smaller, and the category filter bar is hidden.
- Category “All items” shows a mixed/shuffled feed combining Eyes, Skin, Lips, and Nails.
- Cart page (`/cart`) with quantities, remove, empty cart, and “Buy Now” which is the only way to reach Checkout.
- Simulated Authentication and Checkout (UI-only):
    - Auth state via Context API with localStorage persistence.
    - Fake login/register that accepts any input and sets a user.
    - Protected route `/checkout` redirects to `/login` and then back.
    - Checkout page with shipping/contact form, payment methods (Card, PIX, Boleto) with basic validation, and order summary; places a mock order and clears the cart.
    - Order success page (`/order-success`) shows order id, total, and payment method.
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

- `src/App.tsx` — routes and global filter state (category/search). Routes: `/`, `/favorites`, `/cart`, `/product/:id`,
  `/login`, `/register`, `/checkout`, `/order-success`.
- `src/index.css` — Tailwind v4 and theme tokens (violet brand + auxiliary palettes).
- `src/components/Header.tsx` — header with search, filters (Eyes/Skin/Lips/Nails), favorites, cart, and login icon.
- `src/context/FavoriteContext.tsx` — favorites provider and `useFavorites` hook.
- `src/components/FavoriteToggleButton.tsx` — UI button that uses the favorites hook (links to `/favorites`).
- `src/context/CartContext.tsx` — cart provider and `useCart` hook.
- `src/components/Card.tsx` — product card.
- `src/components/LoginForm.tsx` — reusable login form.
- `src/components/RegisterForm.tsx` — reusable account creation form.
- `src/components/UserMenu.tsx` — shows login when signed out; shows an avatar (first letter) with a dropdown “Sign out” when signed in.
- `src/context/AuthContext.tsx` — simulated auth provider/hook and `RequireAuth` (route guard).
- `src/pages/Checkout.tsx` — protected checkout page (UI-only) that reads cart items and simulates placing an order.
- `src/pages/OrderSuccess.tsx` — order confirmation page.
- `src/pages/Home.tsx` — product grid with filters and empty states.
- `src/pages/ProductDetails.tsx` — product details and actions (cart/favorite).
- `src/pages/ShoppingCart.tsx` — basic cart page.
- `src/pages/Login.tsx` — page that uses `LoginForm` and links to register.
- `src/pages/Register.tsx` — page that uses `RegisterForm` and links to login.
- `src/api/products.ts` — client for Makeup API + normalization and category mapping.
- `src/types/product.ts` — shared `Product` type used across the app.

## Color theme

- `brand-*` tokens configured to violet (violet 50–950) in `src/index.css`.
- Favorites use `rose-*`, ensuring contrast with the primary brand.

## Conventions

- Reusable components live in `src/components`.
- Route pages live in `src/pages` and mainly compose components.
- Navigation with `react-router-dom` via `<Link />` and `<Routes />`.
- Hooks live in `src/hooks` when they make sense as shortcuts/derived selectors. Available examples:
  - `useCart`, `useCartItems`, `useCartCount`, `useCartSubtotal`, `useCartActions`, `useAddToCart`.
  - `useAuth`, `useAuthUser`, `useIsAuthenticated`, `useAuthActions`.
- Context providers and hooks live in `src/context` (Auth, Cart, Favorites). There are no context re-exports inside `src/components`.
- UI is kept in `src/components` only (e.g., `FavoriteToggleButton`, `Card`, forms, header, footer).

## Roadmap

- [x] Category filters (All/Eyes/Skin/Lips/Nails) and controlled search. [2025‑11‑22]
- [x] Favorites with badge and `/favorites` route. [2025‑11‑16]
- [x] Product details page. [2025‑11‑16]
- [x] Switch primary palette to violet. [2025‑11‑18]
- [x] Login and Register pages with reusable forms; header icon goes straight to `/login`. [2025‑11‑18]
- [x] Integrate public Makeup API (API‑only, no local fallback). Prices shown in USD. [2025‑11‑22]
- [x] Hide cards without image; normalize external images to HTTPS with fallback. [2025‑11‑22]
- [x] “All items” shows a mixed/shuffled list from all categories. [2025‑11‑22]
- [x] Product Details: smaller image and hidden filter bar on this route. [2025‑11‑22]
- [x] Simulated auth + protected Checkout, with payment options and success page showing payment method. [2025‑11‑22]
- [x] Reorganize contexts into `src/context/` and add selector hooks in `src/hooks/`. [2025‑11‑22]

## Changelog

- 2025‑11‑22
    - API-only mode affirmed (no local data). Cards without image are hidden; image URLs normalized to HTTPS with `<img>` fallbacks.
    - “All items” feed shuffled for a mixed experience.
    - Product Details: smaller image; header filter bar hidden on this route.
    - Checkout: added payment methods (Card, PIX, Boleto) with basic UI validation; Order Success shows payment method.
    - User menu updated: avatar with first letter and dropdown “Sign out”; removed Checkout link from header.
    - Contexts moved to `src/context`; added selector hooks in `src/hooks`.
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
- Makeup API — https://makeup-api.herokuapp.com

Final notes: learning project; some parts are UI‑only. Suggestions are welcome.

Last update: 2025‑11‑22 21:15
