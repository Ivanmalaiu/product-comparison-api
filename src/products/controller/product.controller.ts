import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { IProductService } from '../service/product.service.interface';
import { Product } from '../model/product.model';
import { CompareDto } from '../dto/compare.dto';
@ApiTags('Products')
@Controller('compare')
export class ProductController {
  constructor(
    @Inject('IProductService')
    private readonly productService: IProductService,
  ) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Returns product details for comparison' })
  @ApiResponse({
    status: 200,
    description: 'List of products returned successfully.',
    // Swagger needs a DTO, not a TS interface, so this will be ignored unless replaced
  })
  @ApiResponse({ status: 400, description: 'Invalid or missing product IDs.' })
  @ApiResponse({
    status: 404,
    description: 'One or more product IDs were not found.',
  })
  async compare(@Body() compareDto: CompareDto): Promise<Product[]> {
    return this.productService.compareProducts(compareDto.productIds);
  }
}
