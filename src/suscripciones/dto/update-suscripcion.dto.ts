/* src/suscripciones/dto/update-suscripcion.dto.ts: */
import { PartialType } from '@nestjs/mapped-types';
import { CreateSuscripcionDto } from './create-suscripcion.dto.js';

export class UpdateSuscripcionDto extends PartialType(CreateSuscripcionDto) { }