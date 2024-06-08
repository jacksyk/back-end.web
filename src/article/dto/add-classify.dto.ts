import { IsString } from 'class-validator';

export class AddClassifyDto {
  @IsString()
  classify: string;
}
