import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Product } from '../model/product.model';
import { NotFoundException } from '@nestjs/common';

describe('ProductService', () => {
  let service: ProductService;

  const mockProductRepository = {
    findManyByIds: jest.fn(),
  };

  const mockProducts: Product[] = [
    {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Mock Product',
      imageUrl: 'https://example.com/mock.jpg',
      description: 'Test product',
      price: 100,
      rating: 4.5,
      specifications: {
        RAM: '8GB',
        Storage: '256GB SSD',
      },
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: 'IProductRepository',
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return products by ids', async () => {
    mockProductRepository.findManyByIds.mockResolvedValue(mockProducts);

    const ids = ['123e4567-e89b-12d3-a456-426614174000'];
    const result = await service.compareProducts(ids);

    expect(result).toEqual(mockProducts);
    expect(mockProductRepository.findManyByIds).toHaveBeenCalledWith(ids);
  });

  it('should return empty array if ids not found', async () => {
    mockProductRepository.findManyByIds.mockResolvedValue([]);

    const ids = ['non-existent-id'];
    const result = await service.compareProducts(ids);

    expect(result).toEqual([]);
    expect(mockProductRepository.findManyByIds).toHaveBeenCalledWith(ids);
  });

  it('should throw NotFoundException if repository throws it', async () => {
    mockProductRepository.findManyByIds.mockRejectedValue(
      new NotFoundException('Product not found'),
    );

    await expect(service.compareProducts(['invalid-id'])).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return empty array when ids array is empty', async () => {
    mockProductRepository.findManyByIds.mockResolvedValue([]);

    const result = await service.compareProducts([]);
    expect(result).toEqual([]);
    expect(mockProductRepository.findManyByIds).toHaveBeenCalledWith([]);
  });
});
