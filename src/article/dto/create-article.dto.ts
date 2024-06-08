import { IsString, IsOptional, IsNumber } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
export class CreateArticleDto {
  @IsString()
  @IsOptional()
  articleContent: string;
  @IsString()
  @IsOptional()
  articleTitle: string;
  @IsString()
  @IsOptional()
  articleImage: string;
  @IsNumber()
  @IsOptional()
  classify: number;

  @IsOptional()
  userId: User;
}
