import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from './article.entity';
@Entity('article_likes')
export class ArticleLikes {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  likes: number;
  @OneToOne(() => Article)
  @JoinColumn()
  article: Article;
}
