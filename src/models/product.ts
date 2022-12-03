export type ProductStatus = 'completed' | 'pending' | 'failed';

export interface Product {
  id: string;
  product: string;
  price: string;
}
