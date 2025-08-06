export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  rating: number;
  specifications: Record<string, string | number>;
}
