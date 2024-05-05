import { Inject, Injectable, Param, Query } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { ArticleWatch } from './entities/article.info.entity';
import { FindArticleDto } from './dto/find-article.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
@Injectable()
export class ArticleService {
  @Inject(UserService)
  private userService: UserService;
  @InjectRepository(ArticleWatch)
  private articleWatchRepository: Repository<ArticleWatch>;

  @InjectRepository(User)
  private userRepository: Repository<User>;
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}
  async create(createArticleDto: CreateArticleDto) {
    const { articleContent, articleImage, articleTitle, userId } =
      createArticleDto;
    const article = this.articleRepository.create({
      articleContent: articleContent,
      articleTitle: articleTitle,
      articleImage: articleImage,
      user: userId,
    });

    try {
      const message = await this.articleRepository.save(article);

      // 放在这里的位置，是因为cascade级联会给多创建一篇文章
      const articleWatch = this.articleWatchRepository.create({
        wacthNum: 0,
        likes: 0,
        article: {
          id: article.id,
        },
      });

      this.articleWatchRepository.save(articleWatch);

      return {
        code: 200,
        message,
      };
    } catch (err) {
      console.log('err>>>>', err);

      return {
        code: 0,
        error: '参数错误',
      };
    }
  }

  async findAll() {
    // const article = await this.articleWatchRepository
    //   .createQueryBuilder('watch')
    //   .cache(true, 100000)
    //   .leftJoinAndSelect('watch.article', 'article')
    //   .getMany();
    const article = await this.articleRepository.query(
      'select * from article, article_watch where article.id = article_watch.articleId',
    );

    return {
      code: 200,
      message: article,
      total: article.length,
    };
  }

  async find(@Query() query: FindArticleDto) {
    const { page, pageSize } = query;
    const total = await this.articleRepository.count();
    const result = await this.articleRepository.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      code: 200,
      message: result,
      total,
    };
  }

  async getArticleDetail(@Param() id: number) {
    const article = await this.articleRepository.findOne({
      where: {
        id: id,
      },
    });
    return {
      code: 200,
      message: article,
    };
  }

  async watch(id: number) {
    const res = await this.articleWatchRepository.findOne({
      where: {
        article: {
          id: id,
        },
      },
    });

    if (!res) {
      return {
        code: 200,
        message: '没有找到所属id的文章',
      };
    }

    return {
      message: res,
      code: 200,
    };
  }

  async findUserArticle(id: number) {
    const article = await this.articleRepository.find({
      where: {
        user: {
          id: id,
        },
      },
    });
    return {
      code: 200,
      message: article,
    };
  }
}
