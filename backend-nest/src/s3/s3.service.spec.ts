import { Test, TestingModule } from '@nestjs/testing';
import { S3Service } from './s3.service';
import { getClientToken } from 'aws-sdk-v3-nest';
import {
  GetObjectCommand,
  ListBucketsCommand,
  ListObjectsV2Command,
  S3Client,
} from '@aws-sdk/client-s3';
import { faker } from '@faker-js/faker';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

jest.mock('@aws-sdk/s3-request-presigner');

describe('S3Service', () => {
  let service: S3Service;

  let s3Client: S3Client;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        S3Service,
        {
          provide: getClientToken(S3Client, ''),
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<S3Service>(S3Service);
    s3Client = module.get<S3Client>(getClientToken(S3Client, ''));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('listBuckets', () => {
    const mockResult = { Buckets: [] };

    beforeEach(() => {
      (s3Client.send as jest.Mock).mockResolvedValue(mockResult);
    });

    it('should be defined', () => {
      expect(service.listBuckets).toBeDefined();
    });

    describe('s3Client.send', () => {
      it('should call s3Client.send with correct args', async () => {
        await service.listBuckets();

        expect(s3Client.send).toHaveBeenCalledWith(
          expect.objectContaining({
            deserialize: new ListBucketsCommand({})['deserialize'],
          }),
        );
      });

      describe('when s3Client.send throws an error', () => {
        const mockError = new Error('error');

        beforeEach(() => {
          (s3Client.send as jest.Mock).mockRejectedValue(mockError);
        });

        it('should throw an error if s3Client.send throws an error', async () => {
          await expect(service.listBuckets()).rejects.toThrow(mockError);
        });
      });
    });

    it('should return the result of s3Client.send', async () => {
      const result = await service.listBuckets();

      expect(result).toBe(mockResult.Buckets);
    });
  });

  describe('listObjects', () => {
    const bucket = faker.string.alphanumeric();
    const mockResult = { Contents: [] };

    beforeEach(() => {
      (s3Client.send as jest.Mock).mockResolvedValue(mockResult);
    });

    it('should be defined', () => {
      expect(service.listObjects).toBeDefined();
    });

    describe('s3Client.send', () => {
      it('should call s3Client.send with correct args', async () => {
        await service.listObjects(bucket);

        expect(s3Client.send).toHaveBeenCalledWith(
          expect.objectContaining({
            deserialize: new ListObjectsV2Command({
              Bucket: bucket,
            })['deserialize'],
          }),
        );
      });

      describe('when s3Client.send throws an error', () => {
        const mockError = new Error('error');

        beforeEach(() => {
          (s3Client.send as jest.Mock).mockRejectedValue(mockError);
        });

        it('should throw an error if s3Client.send throws an error', async () => {
          await expect(service.listObjects(bucket)).rejects.toThrow(mockError);
        });
      });
    });

    it('should return the result of s3Client.send', async () => {
      const result = await service.listObjects(bucket);

      expect(result).toBe(mockResult.Contents);
    });
  });

  describe('getObjectPresignedDownloadUrl', () => {
    const bucket = faker.string.alphanumeric();
    const objectKey = faker.string.alphanumeric();
    const mockUrl = faker.internet.url();

    beforeEach(() => {
      (getSignedUrl as jest.Mock).mockResolvedValue(mockUrl);
    });

    it('should be defined', () => {
      expect(service.getObjectPresignedDownloadUrl).toBeDefined();
    });

    describe('getSignedUrl', () => {
      it('should call getSignedUrl with correct parameters', async () => {
        await service.getObjectPresignedDownloadUrl(bucket, objectKey);

        expect(getSignedUrl).toHaveBeenCalledWith(
          s3Client,
          expect.objectContaining({
            input: expect.objectContaining({
              Bucket: bucket,
              Key: objectKey,
            }),
            deserialize: new GetObjectCommand({
              Bucket: bucket,
              Key: objectKey,
            })['deserialize'],
          }),
          expect.objectContaining({
            expiresIn: 900,
          }),
        );
      });
    });

    it('should return the result of getSignedUrl', async () => {
      const result = await service.getObjectPresignedDownloadUrl(
        bucket,
        objectKey,
      );

      expect(result).toBe(mockUrl);
    });
  });
});
