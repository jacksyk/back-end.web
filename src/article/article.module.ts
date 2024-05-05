import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { ArticleWatch } from './entities/article.info.entity';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';
@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
  imports: [
    TypeOrmModule.forFeature([Article, ArticleWatch, User]),
    UserModule,
  ],
})
export class ArticleModule {}
