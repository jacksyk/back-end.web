import { IsString, IsNumber, IsOptional } from 'class-validator';
export class UpdateArticleDto {
  @IsString()
  @IsOptional()
  articleContent: string;
  @IsString()
  @IsOptional()
  articleImage: string;
  @IsString()
  @IsOptional()
  articleTitle: string;
  @IsNumber()
  id: number;
}
