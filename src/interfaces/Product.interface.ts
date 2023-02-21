/* eslint-disable no-shadow */
export interface ProductAttributes {
  id: string;
  sellerId: string;
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  stock: Stock;
  images: string;
}

export enum Stock {
  Available = 'Available',
  OutOfStock = 'Out of Stock',
}

export interface IQueryParams {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
}
