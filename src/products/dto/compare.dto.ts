/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsArray, ArrayMinSize, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CompareDto {
  @ApiProperty({
    description: 'List of product UUIDs to compare',
    example: [
      'eec1ec2d-188c-437d-88ca-c2120a4a2c33',
      '7745dcda-d2df-4a67-ae47-aa0c4297bf3f',
      '0e527b24-785f-44e8-895f-a8a84c275e4c',
      'd2bd2144-6d54-4319-a5d5-9114503633ff',
      '361aa17f-8443-44f0-a2bb-d4435259d354',
      'ed4983ee-1a9b-4ce7-9cbb-a9cb1c1d9ebf',
      '4211f7d2-f7ee-41d2-a3bf-6d3dff5c0f43',
      '62cd6111-253a-47c5-af73-69edef1c9ecd',
      'd7264ba2-857d-476c-aa9c-423fd4da6991',
      'd99d9e66-69fe-42ba-8f12-39766f392d3c',
    ],
  })
  @IsArray()
  @ArrayMinSize(2, {
    message: 'You must provide at least 2 product IDs to compare.',
  })
  @IsUUID('4', { each: true })
  productIds: string[];
}
