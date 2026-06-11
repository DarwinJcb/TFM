/* src/restricciones/dto/update-restriccion.dto.ts: */
import { PartialType } from '@nestjs/mapped-types';
import { CreateRestriccionDto } from './create-restriccion.dto.js';

export class UpdateRestriccionDto extends PartialType(CreateRestriccionDto) { }