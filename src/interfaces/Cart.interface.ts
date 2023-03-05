import { ProductAttributes } from "./Product.interface";

export interface CartAttributes {
  id: string;
  productId: string;
  quantity: number;
  userId: string;
  Product?: ProductAttributes[];
}
