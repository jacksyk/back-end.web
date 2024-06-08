import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { FindArticleDto } from './dto/find-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { AddMessageDto } from './dto/add-message.dto';
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Get('/findAll')
  findAll() {
    return this.articleService.findAll();
  }

  @Get('/find')
  find(@Query() query: FindArticleDto) {
    return this.articleService.find(query);
  }

  @Get('/find/:id')
  getArticleDetail(@Param('id') id: number) {
    return this.articleService.getArticleDetail(id);
  }

  @Get('/watch/:id')
  getWatchNum(@Param('id') id: number) {
    return this.articleService.watch(id);
  }

  @Get('/find/user/:id')
  findUserArticle(@Param('id') id: number) {
    return this.articleService.findUserArticle(id);
  }

  @Post('/update')
  updateArticle(@Body() body: UpdateArticleDto) {
    return this.articleService.updateArticle(body);
  }

  @Post('/message')
  addMessage(@Body() body: AddMessageDto) {
    return this.articleService.addMessage(body);
  }

  @Get('/message/:id')
  findMessage(@Param('id') id: number) {
    return this.articleService.getMessage(id);
  }

  @Get('/classify')
  getAllClassify() {
    return this.articleService.getAllClassify();
  }

  @Post('/classify')
  addClassify(@Body() body: { classify: string }) {
    return this.articleService.addClassify(body);
  }

  @Post('/search')
  searchArticle(@Body() body: { articleContent: string }) {
    return this.articleService.searchArticle(body);
  }

  @Get('/classify/find/:id')
  getClassifyFind(@Param('id') id: number) {
    return this.articleService.getClassifyFind(id);
  }
}
