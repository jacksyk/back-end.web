import { EmailService } from './email.service';
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { Pass } from '../auth/auth.decorator';
import { RedisService } from 'src/redis/redis.service';
@Controller('email')
export class EmailController {
  @Inject(RedisService)
  private readonly redisService: RedisService;
  constructor(private readonly emailService: EmailService) {}
  @Get('send')
  @Pass(true)
  async sendEmailCode(@Query('address') address) {
    if (!address)
      return {
        code: 404,
        message: '参数不能为空',
      };

    const verifyCode = Math.random().toString().slice(2, 8);
    await this.emailService.sendMail({
      to: address,
      subject: '登录验证码',
      html: `<p>你的登录验证码是${verifyCode}</p>`,
    });
    this.redisService.set(address, verifyCode, 60 * 5);
    return {
      code: 200,
      message: '发送成功',
    };
  }
}
