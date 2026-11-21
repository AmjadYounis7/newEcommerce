// A product can suit one pet or both. Prices are cents so order totals stay exact.
export const categories = ['Walk', 'Play', 'Dine', 'Rest'] as const;
export type Category = (typeof categories)[number];
export type Pet = 'Dogs' | 'Cats';

export interface Product {
  id: string;
  name: string;
  category: Category;
  pets: Pet[];
  cents: number;
  image: string;
  detail: string;
}

export const products: Product[] = [
  {
    id: 'trail-lead',
    name: 'Trailhead Lead',
    category: 'Walk',
    pets: ['Dogs'],
    cents: 2800,
    image: 'lead',
    detail: 'Forest green · 1.5 m',
  },
  {
    id: 'rope-tug',
    name: 'Sunday Rope Tug',
    category: 'Play',
    pets: ['Dogs'],
    cents: 1600,
    image: 'tug',
    detail: 'Rust & cream · Cotton',
  },
  {
    id: 'stoneware-bowl',
    name: 'Meadow Bowl',
    category: 'Dine',
    pets: ['Dogs', 'Cats'],
    cents: 2400,
    image: 'bowl',
    detail: 'Sage · 500 ml',
  },
  {
    id: 'field-mat',
    name: 'Field Nap Mat',
    category: 'Rest',
    pets: ['Dogs', 'Cats'],
    cents: 4800,
    image: 'mat',
    detail: 'Olive · Quilted canvas',
  },
  {
    id: 'gingham-bandana',
    name: 'Picnic Bandana',
    category: 'Walk',
    pets: ['Dogs'],
    cents: 1450,
    image: 'bandana',
    detail: 'Ochre · Gingham cotton',
  },
  {
    id: 'feather-wand',
    name: 'Feather Chaser',
    category: 'Play',
    pets: ['Cats'],
    cents: 1200,
    image: 'wand',
    detail: 'Amber · Wooden handle',
  },
  {
    id: 'travel-bowl',
    name: 'Creekside Travel Bowl',
    category: 'Dine',
    pets: ['Dogs', 'Cats'],
    cents: 1850,
    image: 'travel-bowl',
    detail: 'Cobalt · Packable',
  },
  {
    id: 'willow-bed',
    name: 'Willow Nest Bed',
    category: 'Rest',
    pets: ['Cats'],
    cents: 6400,
    image: 'bed',
    detail: 'Natural wicker · Oat cushion',
  },
  {
    id: 'camp-collar',
    name: 'Camp Collar',
    category: 'Walk',
    pets: ['Dogs'],
    cents: 2200,
    image: 'collar',
    detail: 'Terracotta · Brass buckle',
  },
];

export const imageUrl = (product: Product) => `./images/${product.image}.webp`;
export const findProduct = (id: string) =>
  products.find((product) => product.id === id);
