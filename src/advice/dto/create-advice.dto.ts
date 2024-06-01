import { IsString } from 'class-validator';
export class CreateAdviceDto {
  @IsString()
  userId: string;
  @IsString()
  content: string;
}
