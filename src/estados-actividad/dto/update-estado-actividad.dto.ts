/* src/estados-actividad/dto/update-estado-actividad.dto.ts: */
import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoActividadDto } from './create-estado-actividad.dto.js';

export class UpdateEstadoActividadDto extends PartialType(
    CreateEstadoActividadDto,
) { }