/* src/donaciones/dto/update-donacion.dto.ts: */
import { PartialType } from '@nestjs/mapped-types';
import { CreateDonacioneDto } from './create-donacione.dto';

export class UpdateDonacioneDto extends PartialType(CreateDonacioneDto) { }
