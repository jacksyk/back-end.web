import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ArticleLeaveMessage } from './article.leave.message.entity';
@Entity('article')
export class Article {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'text',
  })
  articleContent: string;
  @Column({
    default: '',
  })
  articleTitle: string;
  @Column({
    default: '',
  })
  articleImage: '';
  @CreateDateColumn()
  createTime: Date;

  @OneToMany(
    () => ArticleLeaveMessage,
    (articleLeaveMessage) => articleLeaveMessage.message,
  )
  messageArray: ArticleLeaveMessage[];
}
