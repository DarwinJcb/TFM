/* src/usuarios/dto/update-usuario.dto.ts: */
import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto.js';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) { }