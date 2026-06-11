/* src/donaciones/dto/update-donacion.dto.ts: */
import { PartialType } from '@nestjs/mapped-types';
import { CreateDonacionDto } from './create-donacion.dto.js';

export class UpdateDonacionDto extends PartialType(CreateDonacionDto) { }