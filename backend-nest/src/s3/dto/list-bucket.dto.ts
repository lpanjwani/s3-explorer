import { ApiProperty } from '@nestjs/swagger';

export class ListBucketDto {
  @ApiProperty()
  Name: string;

  @ApiProperty()
  CreationDate: string;

  constructor(data: any) {
    this.Name = data.Name;
    this.CreationDate = data.CreationDate;
  }
}
