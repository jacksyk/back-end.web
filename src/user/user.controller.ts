import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { Pass } from '../auth/auth.decorator';
import { WINSTON_LOGGER_TOKEN } from 'src/constant';

export const CONTEXT = 'user';

@Controller('user')
@Pass(true)
export class UserController {
  @Inject(WINSTON_LOGGER_TOKEN)
  private logger;
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  login(@Body() loginUserDto: LoginUserDto) {
    this.logger.log('login', CONTEXT);
    return this.userService.login(loginUserDto);
  }
}
