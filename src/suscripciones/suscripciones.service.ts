/* src/suscripciones/suscripciones.service.ts: */
import { ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateSuscripcionDto } from './dto/create-suscripcion.dto.js';
import { UpdateSuscripcionDto } from './dto/update-suscripcion.dto.js';

@Injectable()
export class SuscripcionesService {
  constructor(private readonly prisma: PrismaService) { }

  private async verificarUsuarioExiste(UsuarioFK: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        IdUsuario: UsuarioFK,
      },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${UsuarioFK} no encontrado`);
    }

    return usuario;
  }

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

  async create(createSuscripcionDto: CreateSuscripcionDto) {
    await this.verificarUsuarioExiste(createSuscripcionDto.UsuarioFK);
    await this.verificarPlanExiste(createSuscripcionDto.PlanSuscripcionFK);

    const suscripcionExistente = await this.prisma.suscripcion.findUnique({
      where: {
        UsuarioFK: createSuscripcionDto.UsuarioFK,
      },
    });

    if (suscripcionExistente) {
      throw new ConflictException(
        `El usuario con ID ${createSuscripcionDto.UsuarioFK} ya tiene una suscripción`,
      );
    }

    return this.prisma.suscripcion.create({
      data: {
        UsuarioFK: createSuscripcionDto.UsuarioFK,
        PlanSuscripcionFK: createSuscripcionDto.PlanSuscripcionFK,
        fechaFin: createSuscripcionDto.fechaFin
          ? new Date(createSuscripcionDto.fechaFin)
          : undefined,
        activa: createSuscripcionDto.activa,
      },
      include: {
        usuario: true,
        planSuscripcion: true,
      },
    });
  }

  findAll() {
    return this.prisma.suscripcion.findMany({
      include: {
        usuario: true,
        planSuscripcion: true,
      },
    });
  }

  async findOne(id: number) {
    const suscripcion = await this.prisma.suscripcion.findUnique({
      where: {
        IdSuscripcion: id,
      },
      include: {
        usuario: true,
        planSuscripcion: true,
      },
    });

    if (!suscripcion) {
      throw new NotFoundException(`Suscripción con ID ${id} no encontrada`);
    }

    return suscripcion;
  }

  async update(id: number, updateSuscripcionDto: UpdateSuscripcionDto) {
    await this.findOne(id);

    if (updateSuscripcionDto.UsuarioFK !== undefined) {
      await this.verificarUsuarioExiste(updateSuscripcionDto.UsuarioFK);
    }

    if (updateSuscripcionDto.PlanSuscripcionFK !== undefined) {
      await this.verificarPlanExiste(updateSuscripcionDto.PlanSuscripcionFK);
    }

    return this.prisma.suscripcion.update({
      where: {
        IdSuscripcion: id,
      },
      data: {
        UsuarioFK: updateSuscripcionDto.UsuarioFK,
        PlanSuscripcionFK: updateSuscripcionDto.PlanSuscripcionFK,
        fechaFin: updateSuscripcionDto.fechaFin
          ? new Date(updateSuscripcionDto.fechaFin)
          : undefined,
        activa: updateSuscripcionDto.activa,
      },
      include: {
        usuario: true,
        planSuscripcion: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.suscripcion.delete({
      where: {
        IdSuscripcion: id,
      },
    });
  }
}