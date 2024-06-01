import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @Column()
  content: string;

  @CreateDateColumn()
  createTime: Date;
}
