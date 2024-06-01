import { Inject, Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  LoginUserDto,
  ModifyUserDto,
} from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/redis/redis.service';
@Injectable()
export class UserService {
  @Inject(JwtService)
  private jwtService: any;
  @Inject(RedisService)
  private redisService: RedisService;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async verify(code: string, email: string) {
    const verifyCode = await this.redisService.get(email);
    console.log(code, verifyCode, 'code===');

    if (verifyCode === code) {
      return true;
    } else {
      return false;
    }
  }

  async create(createUserDto: CreateUserDto) {
    const { password, username, email, verifyCode } = createUserDto;

    const verifyResult = await this.verify(verifyCode, email);
    if (!verifyResult)
      return {
        code: 200,
        message: '验证码错误',
      };

    const isExsit = await this.userRepository.findOneBy({
      username,
    });
    if (isExsit)
      return {
        code: 200,
        message: '用户名已存在',
      };
    const user = new User();
    user.username = username;
    user.password = password;
    user.email = email;

    const info = await this.userRepository.save(user);

    return {
      code: 200,
      message: '注册成功',
      id: info.id,
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, username } = loginUserDto;

    const info = await this.userRepository.findOne({
      where: {
        username,
        password,
      },
    });

    if (info) {
      return {
        message: '登陆成功',
        code: 200,
        userId: info.id,
        token: this.jwtService.sign({
          sub: info.id,
          name: info.username,
        }),
      };
    } else {
      return {
        message: '账号或密码错误',
      };
    }
  }

  async findOne(id: number) {
    const info = await this.userRepository.findOneBy({
      id,
    });
    return {
      code: 200,
      message: info,
    };
  }

  async modify(modifyUserDto: ModifyUserDto) {
    const { age, email, name, password, userId, username } = modifyUserDto;

    try {
      await this.userRepository.update(
        {
          id: Number(userId),
        },
        {
          age: Number(age),
          email,
          name,
          password,
          username,
        },
      );
      return {
        code: 200,
        message: '修改成功',
      };
    } catch (err) {
      return {
        code: 0,
        message: '修改失败',
      };
    }
  }
}
