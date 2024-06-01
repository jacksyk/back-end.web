import { IsEmail, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  verifyCode: string;
}

export class LoginUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class ModifyUserDto {
  @IsNumber()
  userId: string;

  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsNumber()
  @IsOptional()
  age: string;

  @IsString()
  @IsOptional()
  name: string;
}
