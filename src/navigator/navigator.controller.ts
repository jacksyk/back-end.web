import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { NavigatorService } from './navigator.service';
import { CreateNavigatorDto } from './dto/create-navigator.dto';
import { UpdateNavigatorDto } from './dto/update-navigator.dto';

@Controller('navigator')
export class NavigatorController {
  constructor(private readonly navigatorService: NavigatorService) {}

  @Post()
  create(@Body() createNavigatorDto: CreateNavigatorDto) {
    return this.navigatorService.create(createNavigatorDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.navigatorService.findOne(+id);
  }

  @Put()
  updateOne(@Body() params: UpdateNavigatorDto) {
    return this.navigatorService.update(params);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.navigatorService.remove(+id);
  // }
}
