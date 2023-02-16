export interface IProduct {
  [key: number]: number;
  [key: symbol]: number;
  name: string;
  category: string;
  description: string;
  stock: string;
  price: number;
  images: string;
}
