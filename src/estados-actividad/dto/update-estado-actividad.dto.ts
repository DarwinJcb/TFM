/* src/estados-actividad/dto/update-estado-actividad.dto.ts: */
import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadosActividadDto } from './create-estados-actividad.dto';

export class UpdateEstadosActividadDto extends PartialType(CreateEstadosActividadDto) { }
