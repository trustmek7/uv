export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images: string[];
  colors: string[];
  sizes: string[];
  category: string;
  gender: string;
  upf: string;
  activity: string;
  isConjunto: boolean;
  isNew?: boolean;
}

export interface CartItem {
  id: string; // unique id for cart item (product.id + color + size)
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface FilterState {
  gender: string[];
  size: string[];
  color: string[];
  category: string[];
  upf: string[];
  activity: string[];
  conjuntos: string[];
  priceRange: [number, number];
}