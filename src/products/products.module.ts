import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { ProductRepository } from './repository/product.repository';

@Module({
  controllers: [ProductController],
  providers: [
    {
      provide: 'IProductService',
      useClass: ProductService,
    },
    { provide: 'IProductRepository', useClass: ProductRepository },
  ],
  exports: ['IProductService'],
})
export class ProductsModule {}
