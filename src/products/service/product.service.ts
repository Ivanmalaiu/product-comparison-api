import { Inject, Injectable } from '@nestjs/common';
import { IProductService } from './product.service.interface';
import type { IProductRepository } from '../repository/product.repository.interface';
import { Product } from '../model/product.model';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  /**
   * Fetches products by UUIDs using the repository.
   * Returns the raw product list to be used in a comparison feature.
   */
  async compareProducts(ids: string[]): Promise<Product[]> {
    return await this.productRepository.findManyByIds(ids);
  }
}
