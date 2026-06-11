/* src/estados-actividad/estados-actividad.module.ts: */
import { Module } from '@nestjs/common';
import { EstadosActividadService } from './estados-actividad.service.js';
import { EstadosActividadController } from './estados-actividad.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [EstadosActividadController],
  providers: [EstadosActividadService],
})
export class EstadosActividadModule { }