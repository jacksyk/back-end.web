import { Injectable } from '@nestjs/common';
import { CreateAdviceDto } from './dto/create-advice.dto';
import { UpdateAdviceDto } from './dto/update-advice.dto';
import { Advice } from './entities/advice.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';

@Injectable()
export class AdviceService {
  constructor(
    @InjectRepository(Advice)
    private readonly adviceRepository: Repository<Advice>,
  ) {}
  async create(createAdviceDto: CreateAdviceDto) {
    const { content, userId } = createAdviceDto;
    const entity = this.adviceRepository.create({
      content,
      user: Number(userId),
    });
    await this.adviceRepository.save(entity);
    return {
      code: 200,
      message: '添加成功',
    };
  }

  async findAll() {
    try {
      const message: Record<string, any> = await this.adviceRepository.find({
        relations: ['user'],
      });

      const messageMap = message.map((_item) => {
        const obj = {
          ..._item,
          userName: _item.user.username,
          userId: _item.user.id,
          createTime: dayjs(_item.createTime)
            .add(8, 'hour')
            .format('YYYY-MM-DD HH:mm:ss'),
        };
        delete obj['user'];
        return obj;
      });

      return {
        code: 200,
        message: messageMap,
      };
    } catch (err) {
      return {
        code: 0,
        err,
      };
    }
  }
}
