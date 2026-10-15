export interface Variant {
  id: string;
  packSize: string;
  count: number;
  unit: string;
  price: number;
  unitPrice: number;
  savingsPercent: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category: string;
  formulation: string;
  strength: string;
  activeIngredient: string;
  price: number;
  highPrice: number | null;
  currency: string;
  inStock: boolean;
  description: string;
  fullDescription: string;
  images: string[];
  primaryImage: string;
  rating: number;
  reviewCount: number;
  isBestSeller: boolean;
  isTrending: boolean;
  isMostViewed: boolean;
  variants: Variant[];
  sourceUrl?: string;
}

export interface CartItem {
  id: string; // unique item id: productId + variantId
  productId: string;
  productName: string;
  slug: string;
  image: string;
  category: string;
  price: number;
  variantId?: string;
  packSize?: string;
  unitPrice?: number;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  status: 'Confirmed' | 'Processing';
}
