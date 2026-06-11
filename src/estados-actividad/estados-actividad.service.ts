/* src/estados-actividad/estados-actividad.service.ts: */
import { Injectable } from '@nestjs/common';
import { CreateEstadosActividadDto } from './dto/create-estados-actividad.dto';
import { UpdateEstadosActividadDto } from './dto/update-estados-actividad.dto';

@Injectable()
export class EstadosActividadService {
  create(createEstadosActividadDto: CreateEstadosActividadDto) {
    return 'This action adds a new estadosActividad';
  }

  findAll() {
    return `This action returns all estadosActividad`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estadosActividad`;
  }

  update(id: number, updateEstadosActividadDto: UpdateEstadosActividadDto) {
    return `This action updates a #${id} estadosActividad`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadosActividad`;
  }
}
