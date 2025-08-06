import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { Product } from '../model/product.model';
import { NotFoundException } from '@nestjs/common';

describe('ProductController', () => {
  let controller: ProductController;

  const mockProductService = {
    compareProducts: jest.fn(),
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
      controllers: [ProductController],
      providers: [
        {
          provide: 'IProductService',
          useValue: mockProductService,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return products from compare endpoint', async () => {
    const ids = ['123e4567-e89b-12d3-a456-426614174000'];
    mockProductService.compareProducts.mockResolvedValue(mockProducts);

    const result = await controller.compare({ productIds: ids });

    expect(result).toEqual(mockProducts);
    expect(mockProductService.compareProducts).toHaveBeenCalledWith(ids);
  });

  it('should throw NotFoundException when product is not found', async () => {
    const ids = ['non-existent'];
    mockProductService.compareProducts.mockRejectedValue(
      new NotFoundException('Product not found'),
    );

    await expect(controller.compare({ productIds: ids })).rejects.toThrow(
      NotFoundException,
    );
    expect(mockProductService.compareProducts).toHaveBeenCalledWith(ids);
  });

  it('should return empty array if productIds is empty', async () => {
    const ids: string[] = [];
    mockProductService.compareProducts.mockResolvedValue([]);

    const result = await controller.compare({ productIds: ids });

    expect(result).toEqual([]);
    expect(mockProductService.compareProducts).toHaveBeenCalledWith(ids);
  });
});
