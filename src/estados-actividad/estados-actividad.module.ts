import { Module } from '@nestjs/common';
import { EstadosActividadService } from './estados-actividad.service';
import { EstadosActividadController } from './estados-actividad.controller';

@Module({
  controllers: [EstadosActividadController],
  providers: [EstadosActividadService],
})
export class EstadosActividadModule {}
