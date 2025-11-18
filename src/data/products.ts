export type Product = {
  id: number;
  name: string;
  priceEUR: number;
  image?: string;
  category: 'hair' | 'skin' | 'nails';
};

// Demo catalog used by Home and ProductDetails
export const demoProducts: Product[] = [
  {
    id: 1,
    name: 'Hydrating Shampoo',
    priceEUR: 9.9,
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1605719124118-c9b0871be2f4?q=80&w=640&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Repair Hair Mask',
    priceEUR: 14.5,
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5e4b9a?q=80&w=640&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Daily Face Cleanser',
    priceEUR: 11.2,
    category: 'skin',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70b2a3b6e?q=80&w=640&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Vitamin C Serum',
    priceEUR: 19.9,
    category: 'skin',
    image: 'https://images.unsplash.com/photo-1571757392712-c4e5f3e6cfb1?q=80&w=640&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Nail Strengthener',
    priceEUR: 7.5,
    category: 'nails',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=640&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'Cuticle Oil',
    priceEUR: 6.9,
    category: 'nails',
    image: 'https://images.unsplash.com/photo-1596464716121-8b9a79cd13e0?q=80&w=640&auto=format&fit=crop',
  },
];
