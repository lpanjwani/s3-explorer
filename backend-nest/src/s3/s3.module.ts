import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { S3Controller } from './s3.controller';
import { AwsSdkModule } from 'aws-sdk-v3-nest';
import { S3Client } from '@aws-sdk/client-s3';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AwsSdkModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      clientType: S3Client,
      useFactory: (configService: ConfigService) => {
        const s3 = new S3Client({
          region: configService.getOrThrow('aws.region'),
          credentials: {
            accessKeyId: configService.getOrThrow('aws.accessKeyId'),
            secretAccessKey: configService.getOrThrow('aws.secretAccessKey'),
          },
        });

        return s3;
      },
    }),
  ],

  controllers: [S3Controller],
  providers: [S3Service],
})
export class S3Module {}
