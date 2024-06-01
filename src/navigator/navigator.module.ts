import { Module } from '@nestjs/common';
import { NavigatorService } from './navigator.service';
import { NavigatorController } from './navigator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Navigator } from './entities/navigator.entity';

@Module({
  controllers: [NavigatorController],
  providers: [NavigatorService],
  imports: [TypeOrmModule.forFeature([Navigator])],
})
export class NavigatorModule {}
