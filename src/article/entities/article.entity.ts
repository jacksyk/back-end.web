import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { ArticleLeaveMessage } from './article.leave.message.entity';
import { User } from 'src/user/entities/user.entity';
import { Classify } from './article.classify.entity';
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
    default: '',
  })
  articleSubTitle: string;

  @ManyToOne(() => Classify, (classify) => classify.id)
  @JoinColumn()
  classify: Classify;

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
