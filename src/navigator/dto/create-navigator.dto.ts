import { IsString, IsOptional } from 'class-validator';
export class CreateNavigatorDto {
  @IsString()
  navigatorName: string;
  @IsString()
  @IsOptional()
  navigatorUrl: string;
  @IsOptional()
  userId: number;
}
