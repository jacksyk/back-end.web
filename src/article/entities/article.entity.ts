import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ArticleLeaveMessage } from './article.leave.message.entity';
import { classify } from '../constants';
import { User } from 'src/user/entities/user.entity';
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
  articleImage: string;

  @Column({
    type: 'enum',
    enum: classify,
    default: null,
  })
  classify: classify;

  @CreateDateColumn()
  createTime: Date;

  @ManyToOne(() => User, (user) => user.articleArray)
  @JoinColumn()
  user: User;

  @OneToMany(
    () => ArticleLeaveMessage,
    (articleLeaveMessage) => articleLeaveMessage.message,
  )
  messageArray: ArticleLeaveMessage[];
}
