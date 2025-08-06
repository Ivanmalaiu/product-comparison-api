/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';

import { AppModule } from './../src/app.module';

describe('ProductCompare (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  const validIds = [
    'eec1ec2d-188c-437d-88ca-c2120a4a2c33',
    '7745dcda-d2df-4a67-ae47-aa0c4297bf3f',
  ];

  describe('/products/compare (POST)', () => {
    it('should return product details for valid IDs', async () => {
      const response = await request(app.getHttpServer())
        .post('/products/compare')
        .send({ productIds: validIds })
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(validIds.length);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('price');
    });

    it('should return 400 for invalid UUIDs', async () => {
      const response = await request(app.getHttpServer())
        .post('/products/compare')
        .send({ productIds: ['not-a-uuid'] })
        .expect(400);

      expect(response.body.message).toContain(
        'each value in productIds must be a UUID',
      );
    });

    it('should return 404 if a product is not found', async () => {
      const response = await request(app.getHttpServer())
        .post('/products/compare')
        .send({
          productIds: [
            'a3f04d9b-7b21-4b84-96dc-3f1dceef79b2',
            '7745dcda-d2df-4a67-ae47-aa0c4297bf3f',
          ],
        })
        .expect(404);

      expect(response.body.message).toContain(
        "Product with ID 'a3f04d9b-7b21-4b84-96dc-3f1dceef79b2' was not found.",
      );
    });

    it('should return 400 if no IDs are provided', async () => {
      const response = await request(app.getHttpServer())
        .post('/products/compare')
        .send({ productIds: [] })
        .expect(400);

      expect(response.body.message).toContain(
        'You must provide at least 2 product IDs to compare.',
      );
    });
  });
});
