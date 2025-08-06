import { Injectable, NotFoundException } from '@nestjs/common';
import { IProductRepository } from './product.repository.interface';
import * as fs from 'fs/promises';
import * as path from 'path';
import { Product } from '../model/product.model';
@Injectable()
export class ProductRepository implements IProductRepository {
  private readonly dataFilePath = path.join(
    process.cwd(),
    'src',
    'products',
    'data',
    'products.json',
  );

  /**
   * Loads and parses the product data file.
   */
  private async loadProducts(): Promise<Product[]> {
    const file = await fs.readFile(this.dataFilePath, 'utf-8');
    return JSON.parse(file) as Product[];
  }

  /**
   * Finds all products matching the given UUIDs.
   * Throws an error if any ID is not found.
   */
  async findManyByIds(ids: string[]): Promise<Product[]> {
    const products = await this.loadProducts();

    const result = ids.map((id) => {
      const product = products.find((prod) => prod.id === id);
      if (!product) {
        throw new NotFoundException(`Product with ID '${id}' was not found.`);
      }
      return product;
    });

    return result;
  }
}
