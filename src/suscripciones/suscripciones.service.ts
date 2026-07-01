/* src/suscripciones/suscripciones.service.ts: */
// import { PrismaService } from '../prisma/prisma.service.js';
// constructor(private readonly prisma: PrismaService) { }

import { ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import { CreateSuscripcionDto } from './dto/create-suscripcion.dto.js';
import { UpdateSuscripcionDto } from './dto/update-suscripcion.dto.js';
import { PrismaComercialService } from '../prisma/prisma-comercial.service.js';
import { PrismaUsuariosService } from '../prisma/prisma-usuarios.service.js';

@Injectable()
export class SuscripcionesService {
  constructor(
    private readonly prisma: PrismaComercialService,
    private readonly prismaUsuarios: PrismaUsuariosService,
  ) { }

  private async verificarUsuarioExiste(UsuarioFK: number) {
    const usuario = await this.prismaUsuarios.usuario.findUnique({
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
        planSuscripcion: true,
      },
    });
  }

  findAll() {
    return this.prisma.suscripcion.findMany({
      include: {
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
        planSuscripcion: true,
      },
    });

    if (!suscripcion) {
      throw new NotFoundException(`Suscripción con ID ${id} no encontrada`);
    }

    return suscripcion;
  }

  async update(id: number, updateSuscripcionDto: UpdateSuscripcionDto) {
    const suscripcionActual = await this.findOne(id);

    const UsuarioFK =
      updateSuscripcionDto.UsuarioFK ?? suscripcionActual.UsuarioFK;

    const PlanSuscripcionFK =
      updateSuscripcionDto.PlanSuscripcionFK ??
      suscripcionActual.PlanSuscripcionFK;

    await this.verificarUsuarioExiste(UsuarioFK);
    await this.verificarPlanExiste(PlanSuscripcionFK);

    const suscripcionExistente = await this.prisma.suscripcion.findUnique({
      where: {
        UsuarioFK,
      },
    });

    if (
      suscripcionExistente &&
      suscripcionExistente.IdSuscripcion !== id
    ) {
      throw new ConflictException(
        `El usuario con ID ${UsuarioFK} ya tiene una suscripción`,
      );
    }

    return this.prisma.suscripcion.update({
      where: {
        IdSuscripcion: id,
      },
      data: {
        UsuarioFK,
        PlanSuscripcionFK,
        fechaFin: updateSuscripcionDto.fechaFin
          ? new Date(updateSuscripcionDto.fechaFin)
          : undefined,
        activa: updateSuscripcionDto.activa,
      },
      include: {
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