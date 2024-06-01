import { Injectable } from '@nestjs/common';
import { CreateNavigatorDto } from './dto/create-navigator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Navigator } from './entities/navigator.entity';
import { UpdateNavigatorDto } from './dto/update-navigator.dto';
import { Repository } from 'typeorm';
@Injectable()
export class NavigatorService {
  @InjectRepository(Navigator)
  private articleWatchRepository: Repository<Navigator>;
  async create(createNavigatorDto: CreateNavigatorDto) {
    const { navigatorName, navigatorUrl, userId } = createNavigatorDto;
    try {
      const info = this.articleWatchRepository.create({
        navigatorName,
        navigatorUrl,
        user: {
          id: userId,
        },
      });
      await this.articleWatchRepository.save(info);
      return {
        code: 200,
        message: '添加成功',
      };
    } catch (err) {
      return {
        code: 0,
        message: '参数错误',
      };
    }
  }

  async findOne(id: number) {
    try {
      const findInfo = await this.articleWatchRepository.find({
        where: {
          user: {
            id: id,
          },
        },
        relations: {
          user: true,
        },
      });
      const message = findInfo.map((_item, _index) => {
        delete _item.user;
        return _item;
      });

      return {
        code: 200,
        message,
      };
    } catch (err) {
      return {
        code: 0,
        message: '参数错误',
      };
    }
  }

  async update(params: UpdateNavigatorDto) {
    const { id, navigatorName, navigatorUrl, userId } = params;
    try {
      await this.articleWatchRepository.update(
        {
          id: id,
          user: {
            id: userId,
          },
        },
        {
          navigatorName,
          navigatorUrl,
        },
      );

      return {
        code: 200,
        message: '修改成功',
      };
    } catch (err) {
      return {
        code: 0,
        message: '参数错误',
      };
    }
  }
}
