import { Controller, Get, Param, Query, Redirect } from '@nestjs/common';
import { S3Service } from './s3.service';
import { ListBucketDto } from './dto/list-bucket.dto';
import { ListObjectDto } from './dto/list-object.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('S3')
@Controller()
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Get('buckets')
  @ApiResponse({ status: 200, type: ListBucketDto, isArray: true })
  async listBuckets(): Promise<ListBucketDto[]> {
    return this.s3Service.listBuckets();
  }

  @Get('buckets/:bucketName/objects')
  @ApiResponse({ status: 200, type: ListObjectDto, isArray: true })
  async listObjects(
    @Param('bucketName') bucketName: string,
  ): Promise<ListObjectDto[]> {
    return this.s3Service.listObjects(bucketName);
  }

  @Get('buckets/:bucketName/objects/download')
  @ApiResponse({ status: 200, type: String })
  @Redirect()
  async getObjectPresignedDownloadUrl(
    @Param('bucketName') bucketName: string,
    @Query('objectKey') objectKey: string,
  ): Promise<{
    url: string;
  }> {
    return {
      url: await this.s3Service.getObjectPresignedDownloadUrl(
        bucketName,
        objectKey,
      ),
    };
  }
}
