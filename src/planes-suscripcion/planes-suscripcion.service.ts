/* src/planes-suscripcion/planes-suscripcion.service.ts: */
// import { PrismaService } from '../prisma/prisma.service.js';
// constructor(private readonly prisma: PrismaService) { }
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanSuscripcionDto } from './dto/create-plan-suscripcion.dto.js';
import { UpdatePlanSuscripcionDto } from './dto/update-plan-suscripcion.dto.js';
import { PrismaComercialService } from '../prisma/prisma-comercial.service.js';

@Injectable()
export class PlanesSuscripcionService {
  constructor(private readonly prisma: PrismaComercialService) { }

  create(createPlanSuscripcionDto: CreatePlanSuscripcionDto) {
    return this.prisma.planSuscripcion.create({
      data: createPlanSuscripcionDto,
    });
  }

  findAll() {
    return this.prisma.planSuscripcion.findMany({
      include: {
        suscripciones: true,
        restricciones: true,
      },
    });
  }

  async findOne(id: number) {
    const plan = await this.prisma.planSuscripcion.findUnique({
      where: {
        IdPlanSuscripcion: id,
      },
      include: {
        suscripciones: true,
        restricciones: true,
      },
    });

    if (!plan) {
      throw new NotFoundException(
        `Plan de suscripción con ID ${id} no encontrado`,
      );
    }

    return plan;
  }

  async update(id: number, updatePlanSuscripcionDto: UpdatePlanSuscripcionDto) {
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