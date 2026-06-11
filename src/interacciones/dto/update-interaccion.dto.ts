/* src/interacciones/dto/update-interaccion.dto.ts: */
import { PartialType } from '@nestjs/mapped-types';
import { CreateInteraccionDto } from './create-interaccion.dto.js';

export class UpdateInteraccionDto extends PartialType(CreateInteraccionDto) { }