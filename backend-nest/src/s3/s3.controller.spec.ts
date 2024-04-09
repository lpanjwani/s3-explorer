import { Test, TestingModule } from '@nestjs/testing';
import { S3Controller } from './s3.controller';
import { S3Service } from './s3.service';
import { faker } from '@faker-js/faker';

describe('S3Controller', () => {
  let controller: S3Controller;
  let s3Service: S3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [S3Controller],
      providers: [
        {
          provide: S3Service,
          useValue: {
            listBuckets: jest.fn(),
            listObjects: jest.fn(),
            getObjectPresignedDownloadUrl: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<S3Controller>(S3Controller);
    s3Service = module.get<S3Service>(S3Service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('listBuckets', () => {
    const mockResult = { Buckets: [] };

    beforeEach(() => {
      (s3Service.listBuckets as jest.Mock).mockResolvedValue(mockResult);
    });

    it('should be defined', () => {
      expect(controller.listBuckets).toBeDefined();
    });

    describe('s3Service.listBuckets', () => {
      it('should call s3Service.listBuckets with correct args', async () => {
        await controller.listBuckets();

        expect(s3Service.listBuckets).toHaveBeenCalled();
      });
    });

    it('should return the result of s3Service.listBuckets', async () => {
      expect(await controller.listBuckets()).toBe(mockResult);
    });
  });

  describe('listObjects', () => {
    const mockResult = { Contents: [] };
    const bucketIdentifier = faker.string.alphanumeric();

    beforeEach(() => {
      (s3Service.listObjects as jest.Mock).mockResolvedValue(mockResult);
    });

    it('should be defined', () => {
      expect(controller.listObjects).toBeDefined();
    });

    describe('s3Service.listObjects', () => {
      it('should call s3Service.listObjects with correct args', async () => {
        await controller.listObjects(bucketIdentifier);

        expect(s3Service.listObjects).toHaveBeenCalledWith(bucketIdentifier);
      });
    });

    it('should return the result of s3Service.listObjects', async () => {
      expect(await controller.listObjects(bucketIdentifier)).toBe(mockResult);
    });
  });

  describe('getObjectPresignedDownloadUrl', () => {
    const mockResult = faker.internet.url();
    const bucketIdentifier = faker.string.alphanumeric();
    const objectKey = faker.string.alphanumeric();

    beforeEach(() => {
      (s3Service.getObjectPresignedDownloadUrl as jest.Mock).mockResolvedValue(
        mockResult,
      );
    });

    it('should be defined', () => {
      expect(controller.getObjectPresignedDownloadUrl).toBeDefined();
    });

    describe('s3Service.getObjectPresignedDownloadUrl', () => {
      it('should call s3Service.getObjectPresignedDownloadUrl with correct args', async () => {
        await controller.getObjectPresignedDownloadUrl(
          bucketIdentifier,
          objectKey,
        );

        expect(s3Service.getObjectPresignedDownloadUrl).toHaveBeenCalledWith(
          bucketIdentifier,
          objectKey,
        );
      });
    });

    it('should return the result of s3Service.getObjectPresignedDownloadUrl', async () => {
      expect(
        await controller.getObjectPresignedDownloadUrl(
          bucketIdentifier,
          objectKey,
        ),
      ).toBe(mockResult);
    });
  });
});
