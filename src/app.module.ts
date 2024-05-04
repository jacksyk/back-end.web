import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Article } from './article/entities/article.entity';
import { ArticleLikes } from './article/entities/article.likes.entity';
import { ArticleLeaveMessage } from './article/entities/article.leave.message.entity';
import { ArticleWatch } from './article/entities/article.watch.entity';
import { WinstonModule } from './winston/winston.module';
import { optionObject } from './winston/MyLogger';
import { EmailModule } from 'src/email/email.module';
import { ArticleModule } from './article/article.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3390,
      username: 'root',
      password: 'shuyikang123',
      database: 'mysql',
      synchronize: true,
      logging: true,
      entities: [
        User,
        Article,
        ArticleLikes,
        ArticleWatch,
        ArticleLeaveMessage,
      ],
      connectorPackage: 'mysql2',
    }),
    JwtModule.register({
      global: true,
      secret: 'shuyikang',
      signOptions: { expiresIn: '1d' },
    }),
    AuthModule,
    UserModule,
    WinstonModule.forRoot(optionObject),
    EmailModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
