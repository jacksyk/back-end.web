import { PartialType } from '@nestjs/mapped-types';
import { CreateAdviceDto } from './create-advice.dto';

export class UpdateAdviceDto extends PartialType(CreateAdviceDto) {}
