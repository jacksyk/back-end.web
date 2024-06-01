import { Module } from '@nestjs/common';
import { AdviceService } from './advice.service';
import { AdviceController } from './advice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advice } from './entities/advice.entity';

@Module({
  controllers: [AdviceController],
  providers: [AdviceService],
  imports: [TypeOrmModule.forFeature([Advice])],
})
export class AdviceModule {}
