/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsArray, ArrayMinSize, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CompareDto {
  @ApiProperty({
    description: 'List of product UUIDs to compare',
    example: [
      'a3e1b3a2-7d7e-4c51-890b-50a7346ed73e',
      'b8d9c0d0-6f85-403f-a8cf-3a21ad8e8a98',
    ],
  })
  @IsArray()
  @ArrayMinSize(2, {
    message: 'You must provide at least 2 product IDs to compare.',
  })
  @IsUUID('4', { each: true })
  productIds: string[];
}
