/* src/usuarios/usuario.service.ts: */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUsuarioDto } from './dto/create-usuario.dto.js';
import { UpdateUsuarioDto } from './dto/update-usuario.dto.js';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) { }

  create(createUsuarioDto: CreateUsuarioDto) {
    return this.prisma.usuario.create({
      data: createUsuarioDto,
    });
  }

  findAll() {
    return this.prisma.usuario.findMany({
      include: {
        fotos: true,
        ubicaciones: true,
        musicas: true,
        suscripcion: {
          include: {
            planSuscripcion: true,
          },
        },
        condicionComunicacion: true,
        estadoActividad: true,
      },
    });
  }

  async findOne(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        IdUsuario: id,
      },
      include: {
        fotos: true,
        ubicaciones: true,
        musicas: true,
        suscripcion: {
          include: {
            planSuscripcion: true,
          },
        },
        condicionComunicacion: true,
        estadoActividad: true,
      },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    await this.findOne(id);

    return this.prisma.usuario.update({
      where: {
        IdUsuario: id,
      },
      data: updateUsuarioDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.usuario.delete({
      where: {
        IdUsuario: id,
      },
    });
  }
}