/* src/estados-actividad/estados-actividad.module.ts: */
// import { PrismaModule } from '../prisma/prisma.module.js';
import { Module } from '@nestjs/common';
import { EstadosActividadService } from './estados-actividad.service.js';
import { EstadosActividadController } from './estados-actividad.controller.js';
import { PrismaUsuariosModule } from '../prisma/prisma-usuarios.module.js';

@Module({
  // imports: [PrismaModule],
  imports: [PrismaUsuariosModule],
  controllers: [EstadosActividadController],
  providers: [EstadosActividadService],
})
export class EstadosActividadModule { }