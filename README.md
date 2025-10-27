# Kel Online Shop (ReDI course project)

This repository is for my project/study for the ReDI School course. The idea is to build a simple online store page to practice React + TypeScript with Tailwind CSS and Vite. I am developing it little by little, focusing first on the visual (UI) and then on the functionalities.

## Technologies I use

- React 19 (with TypeScript) – library for creating the user interface
- Vite – super-fast build/development tool
- Tailwind CSS 4 – CSS utilities for fast styling
- React Router 7 – for navigating between pages (e.g., /login)
- ESLint – code quality

Note: I am not currently using any API. The products on the page are a local array (mock) within the code, just to create the user interface. Later, I can integrate them with a real API.

## Why I chose these tools

- Vite: Initializes the project very quickly and the DX is great.
- Tailwind: Since I'm working on layouts, it was easier to style with utility classes and see the result immediately.
- TypeScript: Helps me avoid silly mistakes while I'm learning and developing the code.
- React Router: I created a login dropdown menu in the header that uses `<Link>` for navigation (e.g., to “/login”), so it makes sense to have the router already configured.


## What is already working (UI)

- Header with:
    - Store name: “Online Shop Kel.”
    - Search field (visual only—no functionality yet).
    - Favorites button with heart icon (visual only—no function for now).
    - Login dropdown (self-contained): clicking on the user icon opens a menu with the links “Login” and “New account”; closes when clicking outside or pressing ESC.
    - Cart icon (visual only — no function yet).
- Category bar on the same line: All items, Hair, Skin, Nails (no functional filter yet).
- Product grid in cards (squares): image area as placeholder, product name, and price in euros (e.g., €12.90).
- Simple footer.

Everything was assembled with Tailwind CSS (utility classes) and functional React components.


## How to run the project

Prerequisites:
- Node.js 18+ (recommended)

Steps:
1. Install dependencies:
```bash
npm install
```
2. Run in development mode:
```bash
npm run dev
```
3. Open the URL that Vite indicates (usually http://localhost:5173).

Production build:
```bash
npm run build
npm run preview
```

Available scripts (package.json):
- `npm run dev` — starts Vite in dev mode.
- `npm run build` — compiles TypeScript and creates the production build.
- `npm run preview` — serves the build for local testing.
- `npm run lint` — runs ESLint.

## Project structure (summary)

- `src/main.tsx` — entry point; wraps the app with `BrowserRouter` and imports Tailwind styles.
- `src/App.tsx` — main page with header, categories, and product grid (mock).
- `src/pages/Login.tsx` — Login dropdown component (self-contained: has the button and menu within it).
- `src/index.css` — imports Tailwind CSS.
- `vite.config.ts` — Vite config.
- `package.json` — scripts and dependencies.

Sample products (mock): they are in an array `demoProducts` inside `App.tsx`, without real images for now (I use a placeholder “Image”).

## How Tailwind is configured here

I am using Tailwind CSS 4, which is simpler to start with:
- In `package.json` I have `tailwindcss` and `@tailwindcss/vite`.
- In `src/index.css`, I just do `@import “tailwindcss”` and I can already use the classes.
- I didn't need to create a Tailwind configuration file for this stage of the project.

## Next steps (personal roadmap)

- [ ] Implement actual favorites functionality (click on the heart saves to state/localStorage).
- [ ] Make the search field functional (filter by product name).
- [ ] Add real images to products (local upload or links).
- [ ] Add cart with global context (or Zustand/Redux, if it makes sense).
- [ ] More complete responsiveness and accessibility (focus on keyboard and screen readers).

## Credits and references

- Icons: I am using SVGs from Heroicons (open-source icon pack from Tailwind Labs). Website: https://heroicons.com — MIT license.
- Standard Vite favicon (`/vite.svg`). Vite project: https://vitejs.dev — MIT license.
- Tailwind CSS: https://tailwindcss.com — MIT License.
- React Router: https://reactrouter.com
- React: https://react.dev

If I reused any code snippets or visual inspiration, my main reference was the official documentation for these tools and public examples.

## Final notes

- This is a learning project. Some buttons and links are only visual for now.
- If you want to make suggestions or open issues, feel free!
- Last update: 10/27/2025.
