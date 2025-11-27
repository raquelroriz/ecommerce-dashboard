# Kel Online Shop

Simple online shop (study project) to practice React + TypeScript with Vite and Tailwind CSS.

The focus is on building the UI and gradually adding features such as filters, favorites, cart, and authentication (UI
only for now).

## Demo

![Demonstração do Website](./assets/ShopKel.gif)

## Tech stack

- React 19 (TypeScript)
- Vite
- Tailwind CSS 4
- React Router 7
- React Hook Form
- Axios
- ESLint

Note: the app integrates with a public API (Makeup API) and relies solely on this API for products. There is no local
data fallback.

## Current features

- Header with:
    - Store name (links to Home).
    - Controlled search by name/type with category filters: All, Eyes, Skin, Lips, Nails.
    - Favorites button with counter and dedicated route: `/favorites`.
    - Cart with badge and link to `/cart`.
    - User menu: when signed out, shows a Login icon (links to `/login`); when signed in, shows an avatar with the first
      letter and a dropdown with "Sign out". No Checkout link in the header.
- Product grid loaded directly from Makeup API and product details page (`/product/:id`) with actions: add to cart and
  favorite.
    - Cards are NOT rendered for products without a valid image.
    - Image URLs are normalized to HTTPS; `<img>` has lazy loading and safe fallback.
    - On Product Details the image is intentionally smaller, and the category filter bar is hidden.
- Category "All items" shows a mixed/shuffled feed combining Eyes, Skin, Lips, and Nails.
- Cart page (`/cart`) with quantities, remove, empty cart, and "Buy Now" which is the only way to reach Checkout.
- Simulated Authentication and Checkout (UI-only):
    - Auth state via Context API with localStorage persistence.
    - Fake login/register that accepts any input and sets a user.
    - Protected route `/checkout` redirects to `/login` and then back.
    - Checkout page with shipping/contact form, payment methods (Card, PIX, Boleto) with basic validation, and order
      summary; places a mock order and clears the cart.
    - Order success page (`/order-success`) shows order id, total, and payment method.
- Authentication (UI):
    - Login page using a reusable `LoginForm` (`/login`).
    - Account creation page using `RegisterForm` (`/register`).
    - The Login page includes a link "Create one" to `/register`.
- Primary "brand" theme in violet (contrasts with the favorites heart in rose).

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
