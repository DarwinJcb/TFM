import { PartialType } from '@nestjs/mapped-types';
import { CreateCondicionesComunicacionDto } from './create-condiciones-comunicacion.dto';

export class UpdateCondicionesComunicacionDto extends PartialType(CreateCondicionesComunicacionDto) {}
