/* src/ubicaciones/dto/update-ubicacion.dto.ts: */
import { PartialType } from '@nestjs/mapped-types';
import { CreateUbicacionDto } from './create-ubicacion.dto.js';

export class UpdateUbicacionDto extends PartialType(CreateUbicacionDto) { }