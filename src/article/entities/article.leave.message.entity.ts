import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from './article.entity';
import { User } from 'src/user/entities/user.entity';
@Entity('article_leave_message')
export class ArticleLeaveMessage {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Article, (article) => article.messageArray)
  message: Article;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
