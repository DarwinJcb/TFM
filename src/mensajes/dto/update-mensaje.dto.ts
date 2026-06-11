/* src/mensajes/dto/update-mensaje.dto.ts: */
import { PartialType } from '@nestjs/mapped-types';
import { CreateMensajeDto } from './create-mensaje.dto.js';

export class UpdateMensajeDto extends PartialType(CreateMensajeDto) { }