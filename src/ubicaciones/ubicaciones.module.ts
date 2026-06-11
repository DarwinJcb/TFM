/* src/ubicaciones/ubicaciones.module.ts: */
import { Module } from '@nestjs/common';
import { UbicacionesService } from './ubicaciones.service.js';
import { UbicacionesController } from './ubicaciones.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [UbicacionesController],
  providers: [UbicacionesService],
})
export class UbicacionesModule { }