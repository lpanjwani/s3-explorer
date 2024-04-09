import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('S3Controller (e2e)', () => {
  let app: INestApplication;

  let bucketName: string;
  let objectKey: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /buckets', () => {
    it('should return 200 with expected response', () => {
      return request(app.getHttpServer())
        .get('/buckets')
        .expect(200)
        .expect((res) => {
          expect(res.body.length).toBeGreaterThan(0);

          expect(res.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                Name: expect.any(String),
                CreationDate: expect.any(String),
              }),
            ]),
          );

          bucketName = res.body[0].Name;
        });
    });
  });

  describe('GET /buckets/:bucketName/objects', () => {
    it('with invalid bucket name, should return 500', () => {
      return request(app.getHttpServer())
        .get(`/buckets/invalid-bucket-name/objects`)
        .expect(500);
    });

    it('should return 200 with expected response', () => {
      return request(app.getHttpServer())
        .get(`/buckets/${bucketName}/objects`)
        .expect(200)
        .expect((res) => {
          expect(res.body.length).toBeGreaterThan(0);

          expect(res.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                Key: expect.any(String),
                LastModified: expect.any(String),
                ETag: expect.any(String),
                Size: expect.any(Number),
                StorageClass: expect.any(String),
              }),
            ]),
          );

          objectKey = res.body[0].Key;
        });
    });
  });

  describe('GET /buckets/:bucketName/objects/download', () => {
    it('should return 200 with expected response', () => {
      return request(app.getHttpServer())
        .get(`/buckets/${bucketName}/objects/download`)
        .query({
          objectKey,
        })
        .expect(302)
        .expect((res) => {
          expect(res.text).toEqual(expect.any(String));
        });
    });
  });
});
