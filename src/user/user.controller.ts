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
import {
  CreateUserDto,
  LoginUserDto,
  ModifyUserDto,
} from './dto/create-user.dto';
import { Pass } from '../auth/auth.decorator';
import { WINSTON_LOGGER_TOKEN } from 'src/constant';

export const CONTEXT = 'user';

@Controller('user')
@Pass(true)
export class UserController {
  @Inject(WINSTON_LOGGER_TOKEN)
  private logger;
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/verifyName/:username')
  verifyName(@Param('username') username: string) {
    return this.userService.verifyName(username);
  }

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    this.logger.log('login', CONTEXT);
    return this.userService.login(loginUserDto);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Post('/modify')
  modify(@Body() modifyUserDto: ModifyUserDto) {
    return this.userService.modify(modifyUserDto);
  }
}
