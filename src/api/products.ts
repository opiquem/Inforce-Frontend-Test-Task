import { Product } from '../types/Product';
import { client } from '../utils/fetchClient';

export const getProducts = () => {
  return client.get<Product[]>('Products');
}

export const createProduct = (product: Omit<Product, 'id'>) => {
  return client.post<Product>('Products', product);
};

export const deleteProduct = (productId: number) => {
  return client.delete(`Products/${productId}`);
};

export const updateProduct = (productId: number,
  Product: Partial<Pick<Product, 'name'>>) => {
  return client.patch(`Products/${productId}`, Product);
};
