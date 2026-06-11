/* src/interacciones/interacciones.service.ts: */
import { Injectable } from '@nestjs/common';
import { CreateInteraccioneDto } from './dto/create-interaccion.dto';
import { UpdateInteraccioneDto } from './dto/update-interaccion.dto';

@Injectable()
export class InteraccionesService {
  create(createInteraccioneDto: CreateInteraccioneDto) {
    return 'This action adds a new interaccione';
  }

  findAll() {
    return `This action returns all interacciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} interaccione`;
  }

  update(id: number, updateInteraccioneDto: UpdateInteraccioneDto) {
    return `This action updates a #${id} interaccione`;
  }

  remove(id: number) {
    return `This action removes a #${id} interaccione`;
  }
}
