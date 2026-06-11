/* src/restricciones/restricciones.module.ts: */
import { Module } from '@nestjs/common';
import { RestriccionesService } from './restricciones.service.js';
import { RestriccionesController } from './restricciones.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [RestriccionesController],
  providers: [RestriccionesService],
})
export class RestriccionesModule { }