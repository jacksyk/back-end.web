import { PartialType } from '@nestjs/mapped-types';
import { CreateNavigatorDto } from './create-navigator.dto';
import { IsOptional, IsString } from 'class-validator';
export class UpdateNavigatorDto {
  userId: number;
  id: number;
  @IsString()
  @IsOptional()
  navigatorName: string;
  @IsString()
  @IsOptional()
  navigatorUrl: string;
}
