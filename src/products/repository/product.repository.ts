import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { IProductRepository } from './product.repository.interface';
import * as fs from 'fs/promises';
import * as path from 'path';
import { Product } from '../model/product.model';
/**
 * ProductRepository is responsible for retrieving product data from a local JSON file.
 * The products are loaded once during application startup and cached in memory.
 */
@Injectable()
export class ProductRepository implements IProductRepository, OnModuleInit {
  // Full path to the products JSON file
  private readonly dataFilePath = path.join(
    process.cwd(),
    'src',
    'products',
    'data',
    'products.json',
  );

  // In-memory cache for quick product lookup by ID
  private productMap = new Map<string, Product>();

  /**
   * Lifecycle hook called once after module initialization.
   * Loads and caches product data from file.
   */
  async onModuleInit(): Promise<void> {
    await this.loadAndCacheProducts();
  }

  /**
   * Reads the product JSON file and caches the data in memory using a Map.
   * This avoids reading and parsing the file on every request.
   * Throws descriptive exceptions if loading or parsing fails.
   */
  private async loadAndCacheProducts(): Promise<void> {
    try {
      const file = await fs.readFile(this.dataFilePath, 'utf-8');
      const products = JSON.parse(file) as Product[];

      this.productMap.clear();
      for (const product of products) {
        this.productMap.set(product.id, product);
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        // File not found
        throw new NotFoundException(
          `Data file not found at ${this.dataFilePath}`,
        );
      }
      // General parsing or IO error
      throw new InternalServerErrorException(
        `Error loading or parsing product data: ${(error as Error).message}`,
      );
    }
  }

  /**
   * Finds all products that match the given array of UUIDs.
   * Throws a NotFoundException if any of the IDs do not match a product.
   *
   * @param ids - An array of product UUIDs to retrieve
   * @returns An array of matching products
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async findManyByIds(ids: string[]): Promise<Product[]> {
    const result: Product[] = [];

    for (const id of ids) {
      const product = this.productMap.get(id);
      if (!product) {
        throw new NotFoundException(`Product with ID '${id}' was not found.`);
      }
      result.push(product);
    }

    return result;
  }
}
