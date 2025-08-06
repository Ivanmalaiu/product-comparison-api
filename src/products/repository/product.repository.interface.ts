import { Product } from '../model/product.model';

export interface IProductRepository {
  findManyByIds(ids: string[]): Promise<Product[]>;
}
