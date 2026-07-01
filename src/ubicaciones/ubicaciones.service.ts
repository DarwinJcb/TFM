/* src/ubicaciones/ubicaciones.service.ts: */
// import { PrismaService } from '../prisma/prisma.service.js';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUbicacionDto } from './dto/create-ubicacion.dto.js';
import { UpdateUbicacionDto } from './dto/update-ubicacion.dto.js';
import { PrismaUsuariosService } from '../prisma/prisma-usuarios.service.js';

@Injectable()
export class UbicacionesService {
  // constructor(private readonly prisma: PrismaService) { }
  constructor(private readonly prisma: PrismaUsuariosService) { }


  private async verificarUsuarioExiste(UsuarioFK: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        IdUsuario: UsuarioFK,
      },
    });

    if (!usuario) {
      throw new NotFoundException(
        `Usuario con ID ${UsuarioFK} no encontrado`,
      );
    }

    return usuario;
  }

  async create(createUbicacionDto: CreateUbicacionDto) {
    await this.verificarUsuarioExiste(createUbicacionDto.UsuarioFK);

    return this.prisma.ubicacion.create({
      data: createUbicacionDto,
    });
  }

  findAll() {
    return this.prisma.ubicacion.findMany({
      include: {
        usuario: true,
      },
    });
  }

  async findOne(id: number) {
    const ubicacion = await this.prisma.ubicacion.findUnique({
      where: {
        IdUbicacion: id,
      },
      include: {
        usuario: true,
      },
    });

    if (!ubicacion) {
      throw new NotFoundException(`Ubicación con ID ${id} no encontrada`);
    }

    return ubicacion;
  }

  async update(id: number, updateUbicacionDto: UpdateUbicacionDto) {
    await this.findOne(id);

    if (updateUbicacionDto.UsuarioFK !== undefined) {
      await this.verificarUsuarioExiste(updateUbicacionDto.UsuarioFK);
    }

    return this.prisma.ubicacion.update({
      where: {
        IdUbicacion: id,
      },
      data: updateUbicacionDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.ubicacion.delete({
      where: {
        IdUbicacion: id,
      },
    });
  }
}