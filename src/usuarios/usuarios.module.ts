/* src/usuarios/usuarios.module.ts: */
// import { PrismaModule } from '../prisma/prisma.module.js';
import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service.js';
import { UsuariosController } from './usuario.controller.js';
import { PrismaUsuariosModule } from '../prisma/prisma-usuarios.module.js';


@Module({
  // imports: [PrismaModule],
  imports: [PrismaUsuariosModule],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule { }