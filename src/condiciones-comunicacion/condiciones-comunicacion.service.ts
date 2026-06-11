import { Injectable } from '@nestjs/common';
import { CreateCondicionesComunicacionDto } from './dto/create-condiciones-comunicacion.dto';
import { UpdateCondicionesComunicacionDto } from './dto/update-condiciones-comunicacion.dto';

@Injectable()
export class CondicionesComunicacionService {
  create(createCondicionesComunicacionDto: CreateCondicionesComunicacionDto) {
    return 'This action adds a new condicionesComunicacion';
  }

  findAll() {
    return `This action returns all condicionesComunicacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} condicionesComunicacion`;
  }

  update(id: number, updateCondicionesComunicacionDto: UpdateCondicionesComunicacionDto) {
    return `This action updates a #${id} condicionesComunicacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} condicionesComunicacion`;
  }
}
