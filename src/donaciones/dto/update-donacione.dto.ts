import { PartialType } from '@nestjs/mapped-types';
import { CreateDonacioneDto } from './create-donacione.dto';

export class UpdateDonacioneDto extends PartialType(CreateDonacioneDto) {}
