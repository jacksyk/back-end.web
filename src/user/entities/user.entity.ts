import { Article } from 'src/article/entities/article.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    default: '',
  })
  name: string;

  @Column({
    default: 0,
  })
  age: number;

  @Column({
    default: null,
  })
  email: string;

  @OneToMany(() => Article, (article) => article.user)
  articleArray: Article[];
}
