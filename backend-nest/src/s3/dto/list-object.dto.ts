import { ApiProperty } from '@nestjs/swagger';

export class ListObjectDto {
  @ApiProperty()
  Key: string;

  @ApiProperty()
  LastModified: string;

  @ApiProperty()
  ETag: string;

  @ApiProperty()
  Size: number;

  @ApiProperty()
  StorageClass: string;

  constructor(data: any) {
    this.Key = data.Key;
    this.LastModified = data.LastModified;
    this.ETag = data.ETag;
    this.Size = data.Size;
    this.StorageClass = data.StorageClass;
  }
}
