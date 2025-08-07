import { ProductRepository } from './product.repository';
import * as fs from 'fs/promises';
import { Product } from '../model/product.model';
import { NotFoundException } from '@nestjs/common';

jest.mock('fs/promises');

describe('ProductRepository (with in-memory cache)', () => {
  const mockData: Product[] = [
    {
      id: 'eec1ec2d-188c-437d-88ca-c2120a4a2c33',
      name: 'Samsung Galaxy S23',
      imageUrl: 'https://example.com/images/samsung_galaxy_s23.jpg',
      description: 'This is a high-quality smartphones product.',
      price: 597.9,
      rating: 3.7,
      specifications: {
        Screen: "6.5'' AMOLED",
        Battery: '4000 mAh',
        Camera: '12 MP',
      },
    },
    {
      id: '7745dcda-d2df-4a67-ae47-aa0c4297bf3f',
      name: 'TCL 4K',
      imageUrl: 'https://example.com/images/tcl_4k.jpg',
      description: 'This is a high-quality tvs product.',
      price: 302.03,
      rating: 4.4,
      specifications: {
        'Screen Size': "55''",
        Resolution: '4K',
        'Panel Type': 'QLED',
      },
    },
  ];

  let repository: ProductRepository;

  beforeEach(async () => {
    (fs.readFile as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockData));
    repository = new ProductRepository();
    await repository.onModuleInit();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should load products and cache them in memory', async () => {
    const result = await repository.findManyByIds([mockData[0].id]);
    expect(result).toEqual([mockData[0]]);
    expect(fs.readFile).toHaveBeenCalledTimes(1);
  });

  it('should return multiple products by ids', async () => {
    const result = await repository.findManyByIds([
      mockData[0].id,
      mockData[1].id,
    ]);
    expect(result).toEqual(mockData);
  });

  it('should throw NotFoundException if a product is not found', async () => {
    await expect(repository.findManyByIds(['non-existent'])).rejects.toThrow(
      new NotFoundException("Product with ID 'non-existent' was not found."),
    );
  });

  it('should throw if the file cannot be read during initialization', async () => {
    (fs.readFile as jest.Mock).mockRejectedValueOnce(new Error('File error'));
    const repo = new ProductRepository();
    await expect(repo.onModuleInit()).rejects.toThrow('File error');
  });
});
