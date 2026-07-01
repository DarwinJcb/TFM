/* src/condiciones-comunicacion/condiciones-comunicacion.module.ts: */
// import { PrismaModule } from '../prisma/prisma.module.js';
import { Module } from '@nestjs/common';
import { CondicionesComunicacionService } from './condiciones-comunicacion.service.js';
import { CondicionesComunicacionController } from './condiciones-comunicacion.controller.js';
import { PrismaUsuariosModule } from '../prisma/prisma-usuarios.module.js';

@Module({
  // imports: [PrismaModule],
  imports: [PrismaUsuariosModule],
  controllers: [CondicionesComunicacionController],
  providers: [CondicionesComunicacionService],
})
export class CondicionesComunicacionModule { }