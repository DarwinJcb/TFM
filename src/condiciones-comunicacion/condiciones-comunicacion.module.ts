/* src/condiciones-comunicacion/condiciones-comunicacion.module.ts: */
import { Module } from '@nestjs/common';
import { CondicionesComunicacionService } from './condiciones-comunicacion.service.js';
import { CondicionesComunicacionController } from './condiciones-comunicacion.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [CondicionesComunicacionController],
  providers: [CondicionesComunicacionService],
})
export class CondicionesComunicacionModule { }