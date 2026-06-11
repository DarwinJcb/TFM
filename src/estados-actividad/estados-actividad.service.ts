/* src/estados-actividad/estados-actividad.service.ts: */
import { ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateEstadoActividadDto } from './dto/create-estado-actividad.dto.js';
import { UpdateEstadoActividadDto } from './dto/update-estado-actividad.dto.js';

@Injectable()
export class EstadosActividadService {
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

  async create(createEstadoActividadDto: CreateEstadoActividadDto) {
    await this.verificarUsuarioExiste(createEstadoActividadDto.UsuarioFK);

    const estadoExistente = await this.prisma.estadoActividad.findUnique({
      where: {
        UsuarioFK: createEstadoActividadDto.UsuarioFK,
      },
    });

    if (estadoExistente) {
      throw new ConflictException(
        `El usuario con ID ${createEstadoActividadDto.UsuarioFK} ya tiene estado de actividad`,
      );
    }

    return this.prisma.estadoActividad.create({
      data: {
        estaActivo: createEstadoActividadDto.estaActivo,
        enLive: createEstadoActividadDto.enLive,
        ultimaConexion: createEstadoActividadDto.ultimaConexion
          ? new Date(createEstadoActividadDto.ultimaConexion)
          : undefined,
        UsuarioFK: createEstadoActividadDto.UsuarioFK,
      },
      include: {
        usuario: true,
      },
    });
  }

  findAll() {
    return this.prisma.estadoActividad.findMany({
      include: {
        usuario: true,
      },
    });
  }

  async findOne(id: number) {
    const estado = await this.prisma.estadoActividad.findUnique({
      where: {
        IdEstadoActividad: id,
      },
      include: {
        usuario: true,
      },
    });

    if (!estado) {
      throw new NotFoundException(
        `Estado de actividad con ID ${id} no encontrado`,
      );
    }

    return estado;
  }

  async update(id: number, updateEstadoActividadDto: UpdateEstadoActividadDto) {
    await this.findOne(id);

    if (updateEstadoActividadDto.UsuarioFK !== undefined) {
      await this.verificarUsuarioExiste(updateEstadoActividadDto.UsuarioFK);
    }

    return this.prisma.estadoActividad.update({
      where: {
        IdEstadoActividad: id,
      },
      data: {
        estaActivo: updateEstadoActividadDto.estaActivo,
        enLive: updateEstadoActividadDto.enLive,
        ultimaConexion: updateEstadoActividadDto.ultimaConexion
          ? new Date(updateEstadoActividadDto.ultimaConexion)
          : undefined,
        UsuarioFK: updateEstadoActividadDto.UsuarioFK,
      },
      include: {
        usuario: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.estadoActividad.delete({
      where: {
        IdEstadoActividad: id,
      },
    });
  }
}