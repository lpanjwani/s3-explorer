import {
  GetObjectCommand,
  ListBucketsCommand,
  ListObjectsV2Command,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { InjectAws } from 'aws-sdk-v3-nest';
import { ListBucketDto } from './dto/list-bucket.dto';
import { ListObjectDto } from './dto/list-object.dto';

@Injectable()
export class S3Service {
  constructor(@InjectAws(S3Client) private readonly s3Client: S3Client) {}

  async listBuckets(): Promise<ListBucketDto[]> {
    const listCommand = new ListBucketsCommand({});
    const res = await this.s3Client.send(listCommand);

    return res.Buckets.map((item) => new ListBucketDto(item));
  }

  async listObjects(bucket: string): Promise<ListObjectDto[]> {
    const listCommand = new ListObjectsV2Command({
      Bucket: bucket,
    });

    const res = await this.s3Client.send(listCommand);

    return res.Contents.map((item) => new ListObjectDto(item));
  }

  async getObjectPresignedDownloadUrl(
    bucket: string,
    objectKey: string,
  ): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: objectKey,
    });

    const url = await getSignedUrl(this.s3Client, command, {
      expiresIn: 900,
    });

    return url;
  }
}
