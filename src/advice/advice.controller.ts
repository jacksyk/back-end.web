import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdviceService } from './advice.service';
import { CreateAdviceDto } from './dto/create-advice.dto';
import { UpdateAdviceDto } from './dto/update-advice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('advice')
export class AdviceController {
  constructor(private readonly adviceService: AdviceService) {}

  @Post()
  create(@Body() createAdviceDto: CreateAdviceDto) {
    return this.adviceService.create(createAdviceDto);
  }

  @Get()
  getAll() {
    return this.adviceService.findAll();
  }
}
