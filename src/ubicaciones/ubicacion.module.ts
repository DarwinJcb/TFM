/* src/ubicaciones/ubicacion.module.ts: */
import { Module } from '@nestjs/common';
import { UbicacionesService } from './ubicacion.service.js';
import { UbicacionesController } from './ubicacion.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [UbicacionesController],
  providers: [UbicacionesService],
})
export class UbicacionesModule { }