/* src/usuarios/usuario.module.ts: */
import { Module } from '@nestjs/common';
import { UsuariosService } from './usuario.service.js';
import { UsuariosController } from './usuario.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule { }