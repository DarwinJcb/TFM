/* src/condiciones-comunicacion/condiciones-comunicacion.service.ts: */
import { ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCondicionComunicacionDto } from './dto/create-condicion-comunicacion.dto.js';
import { UpdateCondicionComunicacionDto } from './dto/update-condicion-comunicacion.dto.js';

@Injectable()
export class CondicionesComunicacionService {
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

  async create(createCondicionComunicacionDto: CreateCondicionComunicacionDto) {
    await this.verificarUsuarioExiste(createCondicionComunicacionDto.UsuarioFK);

    const condicionExistente =
      await this.prisma.condicionComunicacion.findUnique({
        where: {
          UsuarioFK: createCondicionComunicacionDto.UsuarioFK,
        },
      });

    if (condicionExistente) {
      throw new ConflictException(
        `El usuario con ID ${createCondicionComunicacionDto.UsuarioFK} ya tiene condiciones de comunicación`,
      );
    }

    return this.prisma.condicionComunicacion.create({
      data: createCondicionComunicacionDto,
      include: {
        usuario: true,
      },
    });
  }

  findAll() {
    return this.prisma.condicionComunicacion.findMany({
      include: {
        usuario: true,
      },
    });
  }

  async findOne(id: number) {
    const condicion = await this.prisma.condicionComunicacion.findUnique({
      where: {
        IdCondicionComunicacion: id,
      },
      include: {
        usuario: true,
      },
    });

    if (!condicion) {
      throw new NotFoundException(
        `Condición de comunicación con ID ${id} no encontrada`,
      );
    }

    return condicion;
  }

  async update(
    id: number,
    updateCondicionComunicacionDto: UpdateCondicionComunicacionDto,
  ) {
    await this.findOne(id);

    if (updateCondicionComunicacionDto.UsuarioFK !== undefined) {
      await this.verificarUsuarioExiste(updateCondicionComunicacionDto.UsuarioFK);
    }

    return this.prisma.condicionComunicacion.update({
      where: {
        IdCondicionComunicacion: id,
      },
      data: updateCondicionComunicacionDto,
      include: {
        usuario: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.condicionComunicacion.delete({
      where: {
        IdCondicionComunicacion: id,
      },
    });
  }
}