/* src/planes-suscripcion/planes-suscripcion.service.ts: */
import { Injectable } from '@nestjs/common';
import { CreatePlanSuscripcionDto } from './dto/create-plan-suscripcion.dto';
import { UpdatePlanesSuscripcionDto } from './dto/update-plan-suscripcion.dto';

@Injectable()
export class PlanesSuscripcionService {
  create(createPlanesSuscripcionDto: CreatePlanSuscripcionDto) {
    return 'This action adds a new planesSuscripcion';
  }

  findAll() {
    return `This action returns all planesSuscripcion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} planesSuscripcion`;
  }

  update(id: number, updatePlanesSuscripcionDto: UpdatePlanesSuscripcionDto) {
    return `This action updates a #${id} planesSuscripcion`;
  }

  remove(id: number) {
    return `This action removes a #${id} planesSuscripcion`;
  }
}
