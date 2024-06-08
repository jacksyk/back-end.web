import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from './article.entity';
@Entity('article_classify')
export class Classify {
  @PrimaryGeneratedColumn()
  id: number;
  /**
   * 分类名称
   */
  @Column()
  classify: string;

  @OneToMany(() => Article, (Article) => Article.id)
  @JoinColumn()
  articleArray: Article[];
}
