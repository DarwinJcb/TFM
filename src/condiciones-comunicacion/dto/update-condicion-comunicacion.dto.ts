/* src/condiciones-comunicacion/dto/update-condicion-comunicacion.dto.ts: */
import { PartialType } from '@nestjs/mapped-types';
import { CreateCondicionesComunicacionDto } from './create-condicion-comunicacion.dto';

export class UpdateCondicionesComunicacionDto extends PartialType(CreateCondicionesComunicacionDto) { }
