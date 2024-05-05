import { IsString } from 'class-validator';
export class FindArticleDto {
  @IsString()
  page: number;
  @IsString()
  pageSize: number;
}
