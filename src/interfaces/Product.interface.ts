export interface IQueryParams {
  [key: string]: string;
}

// Product Interface
export interface IProduct {
  [key: number]: number;
  [key: symbol]: number;
  name: string;
  category: string;
  description: string;
  stock: string;
  quantity: number;
  price: number;
  images: string;
  sellerId: string;
}

export interface ICart {
  [key: number]: number;
  [key: symbol]: number;
  userId: string;
  productId: number;
  quantity: number;
}
