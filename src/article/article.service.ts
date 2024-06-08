import { Inject, Injectable, Param, Query } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { ArticleWatch } from './entities/article.info.entity';
import { FindArticleDto } from './dto/find-article.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { UpdateArticleDto } from './dto/update-article.dto';
import { AddClassifyDto } from './dto/add-classify.dto';
import { ArticleLeaveMessage } from './entities/article.leave.message.entity';
import { AddMessageDto } from './dto/add-message.dto';
import { Classify } from './entities/article.classify.entity';
import * as dayjs from 'dayjs';
@Injectable()
export class ArticleService {
  @Inject(UserService)
  private userService: UserService;
  @InjectRepository(ArticleWatch)
  private articleWatchRepository: Repository<ArticleWatch>;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectRepository(ArticleLeaveMessage)
  private articleLeaveMessageRepository: Repository<ArticleLeaveMessage>;

  @InjectRepository(Classify)
  private articleClassifyRepository: Repository<Classify>;

  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}
  async create(createArticleDto: CreateArticleDto) {
    const { articleContent, articleImage, articleTitle, userId, classify } =
      createArticleDto;

    const article = this.articleRepository.create({
      articleContent: articleContent,
      articleTitle: articleTitle,
      articleImage: articleImage,
      user: userId,
      classify: {
        id: Number(classify),
      },
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
    const messageMap = article?.map((_item) => ({
      ..._item,
      createTime: dayjs(_item.createTime)
        .add(8, 'hour')
        .format('YYYY-MM-DD HH:mm:ss'),
    }));

    return {
      code: 200,
      message: messageMap,
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

    const resultMap = result.map((_item) => {
      return {
        ..._item,
        createTime: dayjs(_item.createTime)
          .add(8, 'hour')
          .format('YYYY-MM-DD HH:mm:ss'),
      };
    });

    return {
      code: 200,
      message: resultMap,
      total,
    };
  }

  async getArticleDetail(@Param() id: number) {
    const article = await this.articleRepository.query(
      `select * from article, article_watch where article.id = article_watch.articleId and article.id = ${id}`,
    );

    const message = article[0];
    delete message['articleId'];
    delete message['userId'];

    return {
      code: 200,
      message,
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

  async updateArticle(body: UpdateArticleDto) {
    try {
      const { articleContent, articleImage, articleTitle, id } = body;

      await this.articleRepository.update(id, {
        articleContent: articleContent,
        articleImage: articleImage,
        articleTitle: articleTitle,
      });

      return {
        code: 200,
        message: '更新成功',
      };
    } catch (err) {
      return {
        code: 0,
        error: '参数错误',
      };
    }
  }

  async addMessage(body: AddMessageDto) {
    try {
      const { articleId, userId, message } = body;
      const messageInfo = this.articleLeaveMessageRepository.create({
        message: {
          id: articleId,
        },
        content: message,
        user: {
          id: userId,
        },
      });
      await this.articleLeaveMessageRepository.save(messageInfo);
      return {
        code: 200,
        message: '添加成功',
      };
    } catch (err) {
      return {
        code: 0,
        message: '参数错误',
      };
    }
  }

  async getMessage(id: number) {
    try {
      const articleMessageInfo = await this.articleLeaveMessageRepository.find({
        where: {
          message: {
            id: id,
          },
        },
        relations: {
          user: true,
        },
      });

      const articleMessageInfoV2 = articleMessageInfo.map((_item) => {
        const obj = {
          ..._item,
          userName: _item.user.name, // 这个是用户来修改用户名的，不是账号
          createTime: dayjs(_item.createTime)
            .add(8, 'hour')
            .format('YYYY-MM-DD HH:mm:ss'),
        };
        delete obj['user'];
        return obj;
      });

      return {
        code: 200,
        message: articleMessageInfoV2,
      };
    } catch (err) {
      return {
        code: 0,
        message: '参数错误',
      };
    }
  }

  async getAllClassify() {
    const message = await this.articleClassifyRepository.find();
    return {
      code: 200,
      message,
    };
  }

  async addClassify(body: AddClassifyDto) {
    const { classify } = body;
    const articleClassify = this.articleClassifyRepository.create({
      classify: classify,
    });
    try {
      await this.articleClassifyRepository.save(articleClassify);
      return {
        code: 200,
        message: '添加成功',
      };
    } catch (err) {
      console.log(err);
      return {
        code: 0,
        message: '参数错误',
      };
    }
  }

  async searchArticle(body: { articleContent: string }) {
    const { articleContent } = body;
    const article = await this.articleRepository.find({
      where: {
        articleContent: Like(`%${articleContent}%`),
      },
    });
    const messageMap = article?.map((_item) => ({
      ..._item,
      createTime: dayjs(_item.createTime)
        .add(8, 'hour')
        .format('YYYY-MM-DD HH:mm:ss'),
    }));

    return {
      code: 200,
      message: messageMap,
    };
  }
  async getClassifyFind(id: number) {
    const info = await this.articleRepository.find({
      where: {
        classify: {
          id: id,
        },
      },
    });

    const mapData = info.map((_article) => {
      return {
        ..._article,
        createTime: dayjs(_article.createTime)
          .add(8, 'hour')
          .format('YYYY-MM-DD HH:mm:ss'),
      };
    });
    return {
      code: 200,
      message: mapData,
    };
  }
}
