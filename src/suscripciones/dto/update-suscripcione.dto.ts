/* src/suscripciones/dto/update-suscripcione.dto.ts: */
import { PartialType } from '@nestjs/mapped-types';
import { CreateSuscripcioneDto } from './create-suscripcione.dto';

export class UpdateSuscripcioneDto extends PartialType(CreateSuscripcioneDto) { }
