import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('advice')
export class Advice {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User)
  @JoinColumn()
  user: number;
  @Column()
  content: string;
  @CreateDateColumn()
  createTime: Date;
}
