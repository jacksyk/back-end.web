import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from './article.entity';
@Entity('article_watch')
export class ArticleWatch {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  wacthNum: number;
  @Column()
  likes: number;
  @JoinColumn()
  @OneToOne(() => Article, {
    cascade: true,
  })
  article: Article;
}
