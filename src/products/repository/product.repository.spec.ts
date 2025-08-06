import { ProductRepository } from './product.repository';
import * as fs from 'fs/promises';
import { Product } from '../model/product.model';
import { NotFoundException } from '@nestjs/common';

jest.mock('fs/promises');

describe('ProductRepository', () => {
  let repository: ProductRepository;

  const mockData: Product[] = [
    {
      id: '1',
      name: 'Test Product',
      imageUrl: '',
      description: '',
      price: 100,
      rating: 4,
      specifications: { key: 'value' },
    },
    {
      id: '2',
      name: 'Another Product',
      imageUrl: '',
      description: '',
      price: 200,
      rating: 5,
      specifications: { key: 'value' },
    },
  ];

  beforeEach(() => {
    repository = new ProductRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should load products from file', async () => {
    (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockData));

    const products = await repository['loadProducts']();
    expect(products).toEqual(mockData);
    expect(fs.readFile).toHaveBeenCalled();
  });

  it('should return products by ids', async () => {
    (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockData));

    const ids = ['1'];
    const result = await repository.findManyByIds(ids);
    expect(result).toEqual([mockData[0]]);
  });

  it('should throw NotFoundException if id not found', async () => {
    (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockData));

    const ids = ['non-existent'];

    await expect(repository.findManyByIds(ids)).rejects.toThrow(
      new NotFoundException("Product with ID 'non-existent' was not found."),
    );
  });

  it('should throw if file cannot be read', async () => {
    (fs.readFile as jest.Mock).mockRejectedValue(new Error('File error'));

    await expect(repository.findManyByIds(['1'])).rejects.toThrow('File error');
  });
  it('should return multiple products by ids', async () => {
    (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockData));

    const ids = ['1', '2'];
    const result = await repository.findManyByIds(ids);
    expect(result).toEqual(mockData);
  });
});
