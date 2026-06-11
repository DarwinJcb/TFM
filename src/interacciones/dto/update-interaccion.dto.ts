/* src/interacciones/dto/update-interaccion.dto.ts: */
import { PartialType } from '@nestjs/mapped-types';
import { CreateInteraccioneDto } from './create-interaccion.dto';

export class UpdateInteraccioneDto extends PartialType(CreateInteraccioneDto) { }
