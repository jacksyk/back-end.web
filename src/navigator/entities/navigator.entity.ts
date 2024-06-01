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
import { User } from 'src/user/entities/user.entity';
@Entity('navigator')
export class Navigator {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  navigatorName: string;
  @Column()
  navigatorUrl: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
  @CreateDateColumn()
  createTime: Date;
}
