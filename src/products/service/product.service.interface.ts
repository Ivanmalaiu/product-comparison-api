import { Product } from '../model/product.model';

export interface IProductService {
  compareProducts(ids: string[]): Promise<Product[]>;
}
