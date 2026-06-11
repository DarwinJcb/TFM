/* src/planes-suscripcion/planes-suscripcion.service.ts: */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePlanSuscripcionDto } from './dto/create-plan-suscripcion.dto.js';
import { UpdatePlanSuscripcionDto } from './dto/update-plan-suscripcion.dto.js';

@Injectable()
export class PlanesSuscripcionService {
  constructor(private readonly prisma: PrismaService) { }

  create(createPlanSuscripcionDto: CreatePlanSuscripcionDto) {
    return this.prisma.planSuscripcion.create({
      data: createPlanSuscripcionDto,
    });
  }

  findAll() {
    return this.prisma.planSuscripcion.findMany({
      include: {
        restricciones: true,
        suscripciones: true,
      },
    });
  }

  async findOne(id: number) {
    const plan = await this.prisma.planSuscripcion.findUnique({
      where: {
        IdPlanSuscripcion: id,
      },
      include: {
        restricciones: true,
        suscripciones: true,
      },
    });

    if (!plan) {
      throw new NotFoundException(
        `Plan de suscripción con ID ${id} no encontrado`,
      );
    }

    return plan;
  }

  async update(
    id: number,
    updatePlanSuscripcionDto: UpdatePlanSuscripcionDto,
  ) {
    await this.findOne(id);

    return this.prisma.planSuscripcion.update({
      where: {
        IdPlanSuscripcion: id,
      },
      data: updatePlanSuscripcionDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.planSuscripcion.delete({
      where: {
        IdPlanSuscripcion: id,
      },
    });
  }
}