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

    // Create a dictionary for faster lookup
    const productMap = new Map<string, Product>();
    for (const product of products) {
      productMap.set(product.id, product);
    }

    const result: Product[] = [];

    for (const id of ids) {
      const product = productMap.get(id);
      if (!product) {
        throw new NotFoundException(`Product with ID '${id}' was not found.`);
      }
      result.push(product);
    }

    return result;
  }
}
