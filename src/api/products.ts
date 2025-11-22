// Simple client for Makeup API with normalization to local Product type
import type { Product } from "../types/product";

const BASE = "https://makeup-api.herokuapp.com/api/v1";

type MakeupApiProduct = {
  id: number;
  name: string;
  price: string | number | null;
  image_link?: string | null;
  product_type?: string | null;
};

// Map product_type to our 4 categories (eyes, skin, lips, nails)
const TYPE_TO_CATEGORY = new Map<string, Product["category"]>([
  // eyes
  ["mascara", "eyes"],
  ["eyeliner", "eyes"],
  ["eyeshadow", "eyes"],
  ["eyebrow", "eyes"],
  // lips
  ["lip_liner", "lips"],
  ["lipstick", "lips"],
  // skin (face base/care)
  ["foundation", "skin"],
  ["concealer", "skin"],
  ["powder", "skin"],
  ["bronzer", "skin"],
  ["blush", "skin"],
  ["highlighter", "skin"],
  ["primer", "skin"],
  // nails
  ["nail_polish", "nails"],
]);

const CATEGORY_TO_TYPES: Record<Product["category"], string[]> = {
  eyes: ["mascara", "eyeliner", "eyeshadow", "eyebrow"],
  lips: ["lip_liner", "lipstick"],
  skin: ["foundation", "concealer", "powder", "bronzer", "blush", "highlighter", "primer"],
  nails: ["nail_polish"],
};

function toNumberPriceUSD(input: MakeupApiProduct["price"]): number {
  if (input == null) return 0;
  const n = typeof input === "number" ? input : parseFloat(input);
  return Number.isFinite(n) ? n : 0;
}

function normalize(p: MakeupApiProduct): Product {
  // Guess category from product_type (fallback makeup)
  const type = (p.product_type || "").toLowerCase();
  const category = TYPE_TO_CATEGORY.get(type) || "eyes";
  // Sanitize image URL: trim, coerce http -> https, drop empty
  const raw = (p.image_link || undefined)?.toString().trim();
  let image: string | undefined = raw && raw.length > 0 ? raw : undefined;
  if (image && image.startsWith("http://")) {
    image = image.replace(/^http:\/\//i, "https://");
  }
  return {
    id: p.id,
    name: p.name,
    priceUSD: toNumberPriceUSD(p.price),
    image,
    category,
  };
}

async function fetchJson(url: string): Promise<any> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function fetchByTypes(types: string[], q?: string): Promise<Product[]> {
  const requests = types.map(async (t) => {
    const url = new URL(`${BASE}/products.json`);
    url.searchParams.set("product_type", t);
    if (q && q.trim()) url.searchParams.set("product_name", q.trim());
    const data: MakeupApiProduct[] = await fetchJson(url.toString());
    return data.map(normalize);
  });
  const arrays = await Promise.all(requests);
  // Flatten & de-duplicate by id
  const map = new Map<number, Product>();
  arrays.flat().forEach((p) => map.set(p.id, p));
  return Array.from(map.values());
}

export async function fetchProductsByCategory(category: Product["category"], q?: string): Promise<Product[]> {
  const types = CATEGORY_TO_TYPES[category];
  return fetchByTypes(types, q);
}

export async function fetchAllCategories(q?: string): Promise<Product[]> {
  const all = await Promise.all([
    fetchProductsByCategory("eyes", q),
    fetchProductsByCategory("skin", q),
    fetchProductsByCategory("lips", q),
    fetchProductsByCategory("nails", q),
  ]);
  const map = new Map<number, Product>();
  all.flat().forEach((p) => map.set(p.id, p));
  return Array.from(map.values());
}

export async function fetchProductById(id: number): Promise<Product | undefined> {
  try {
    const data: MakeupApiProduct = await fetchJson(`${BASE}/products/${id}.json`);
    return normalize(data);
  } catch {
    return undefined;
  }
}
