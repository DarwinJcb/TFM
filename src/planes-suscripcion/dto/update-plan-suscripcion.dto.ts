/* src/planes-suscripcion/dto/update-plan-suscripcion.dto.ts: */
import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanSuscripcionDto } from './create-plan-suscripcion.dto.js';

export class UpdatePlanSuscripcionDto extends PartialType(
    CreatePlanSuscripcionDto,
) { }