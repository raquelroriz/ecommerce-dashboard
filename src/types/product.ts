export type Product = {
  id: number;
  name: string;
  // Price in USD, aligned with Makeup API
  priceUSD: number;
  image?: string;
  category: 'eyes' | 'skin' | 'lips' | 'nails';
};
