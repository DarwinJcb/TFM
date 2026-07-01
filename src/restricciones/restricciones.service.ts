/* src/restricciones/restricciones.service.ts: */
// import { PrismaService } from '../prisma/prisma.service.js';
// constructor(private readonly prisma: PrismaService) { }
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestriccionDto } from './dto/create-restriccion.dto.js';
import { UpdateRestriccionDto } from './dto/update-restriccion.dto.js';
import { PrismaComercialService } from '../prisma/prisma-comercial.service.js';

@Injectable()
export class RestriccionesService {
  constructor(private readonly prisma: PrismaComercialService) { }

  private async verificarPlanExiste(PlanSuscripcionFK: number) {
    const plan = await this.prisma.planSuscripcion.findUnique({
      where: {
        IdPlanSuscripcion: PlanSuscripcionFK,
      },
    });

    if (!plan) {
      throw new NotFoundException(
        `Plan de suscripción con ID ${PlanSuscripcionFK} no encontrado`,
      );
    }

    return plan;
  }

  async create(createRestriccionDto: CreateRestriccionDto) {
    if (createRestriccionDto.PlanSuscripcionFK !== undefined) {
      await this.verificarPlanExiste(createRestriccionDto.PlanSuscripcionFK);
    }

    return this.prisma.restriccion.create({
      data: createRestriccionDto,
      include: {
        planSuscripcion: true,
      },
    });
  }

  findAll() {
    return this.prisma.restriccion.findMany({
      include: {
        planSuscripcion: true,
      },
    });
  }

  async findOne(id: number) {
    const restriccion = await this.prisma.restriccion.findUnique({
      where: {
        IdRestriccion: id,
      },
      include: {
        planSuscripcion: true,
      },
    });

    if (!restriccion) {
      throw new NotFoundException(`Restricción con ID ${id} no encontrada`);
    }

    return restriccion;
  }

  async update(id: number, updateRestriccionDto: UpdateRestriccionDto) {
    await this.findOne(id);

    if (updateRestriccionDto.PlanSuscripcionFK !== undefined) {
      await this.verificarPlanExiste(updateRestriccionDto.PlanSuscripcionFK);
    }

    return this.prisma.restriccion.update({
      where: {
        IdRestriccion: id,
      },
      data: updateRestriccionDto,
      include: {
        planSuscripcion: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.restriccion.delete({
      where: {
        IdRestriccion: id,
      },
    });
  }
}