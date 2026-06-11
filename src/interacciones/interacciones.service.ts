/* src/interacciones/interacciones.service.ts: */
import { BadRequestException, ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateInteraccionDto } from './dto/create-interaccion.dto.js';
import { UpdateInteraccionDto } from './dto/update-interaccion.dto.js';

@Injectable()
export class InteraccionesService {
  constructor(private readonly prisma: PrismaService) { }

  private async verificarUsuarioExiste(idUsuario: number, nombreCampo: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        IdUsuario: idUsuario,
      },
    });

    if (!usuario) {
      throw new NotFoundException(
        `${nombreCampo} con ID ${idUsuario} no encontrado`,
      );
    }

    return usuario;
  }

  private validarUsuariosDiferentes(
    UsuarioOrigenFK: number,
    UsuarioDestinoFK: number,
  ) {
    if (UsuarioOrigenFK === UsuarioDestinoFK) {
      throw new BadRequestException(
        'El usuario origen y el usuario destino no pueden ser el mismo',
      );
    }
  }

  async create(createInteraccionDto: CreateInteraccionDto) {
    this.validarUsuariosDiferentes(
      createInteraccionDto.UsuarioOrigenFK,
      createInteraccionDto.UsuarioDestinoFK,
    );

    await this.verificarUsuarioExiste(
      createInteraccionDto.UsuarioOrigenFK,
      'Usuario origen',
    );

    await this.verificarUsuarioExiste(
      createInteraccionDto.UsuarioDestinoFK,
      'Usuario destino',
    );

    const interaccionExistente = await this.prisma.interaccion.findUnique({
      where: {
        UsuarioOrigenFK_UsuarioDestinoFK_tipo: {
          UsuarioOrigenFK: createInteraccionDto.UsuarioOrigenFK,
          UsuarioDestinoFK: createInteraccionDto.UsuarioDestinoFK,
          tipo: createInteraccionDto.tipo,
        },
      },
    });

    if (interaccionExistente) {
      throw new ConflictException(
        'Esta interacción ya existe entre estos usuarios',
      );
    }

    const interaccion = await this.prisma.interaccion.create({
      data: createInteraccionDto,
      include: {
        usuarioOrigen: true,
        usuarioDestino: true,
      },
    });

    if (createInteraccionDto.tipo === 'LIKE') {
      await this.crearMatchSiExisteLikeMutuo(
        createInteraccionDto.UsuarioOrigenFK,
        createInteraccionDto.UsuarioDestinoFK,
      );
    }

    return interaccion;
  }

  private async crearMatchSiExisteLikeMutuo(
    UsuarioOrigenFK: number,
    UsuarioDestinoFK: number,
  ) {
    const likeMutuo = await this.prisma.interaccion.findUnique({
      where: {
        UsuarioOrigenFK_UsuarioDestinoFK_tipo: {
          UsuarioOrigenFK: UsuarioDestinoFK,
          UsuarioDestinoFK: UsuarioOrigenFK,
          tipo: 'LIKE',
        },
      },
    });

    if (!likeMutuo) {
      return;
    }

    const usuarioMenor = Math.min(UsuarioOrigenFK, UsuarioDestinoFK);
    const usuarioMayor = Math.max(UsuarioOrigenFK, UsuarioDestinoFK);

    const matchExistente = await this.prisma.match.findUnique({
      where: {
        UsuarioUnoFK_UsuarioDosFK: {
          UsuarioUnoFK: usuarioMenor,
          UsuarioDosFK: usuarioMayor,
        },
      },
    });

    if (matchExistente) {
      return;
    }

    await this.prisma.match.create({
      data: {
        UsuarioUnoFK: usuarioMenor,
        UsuarioDosFK: usuarioMayor,
      },
    });
  }

  findAll() {
    return this.prisma.interaccion.findMany({
      include: {
        usuarioOrigen: true,
        usuarioDestino: true,
      },
    });
  }

  async findOne(id: number) {
    const interaccion = await this.prisma.interaccion.findUnique({
      where: {
        IdInteraccion: id,
      },
      include: {
        usuarioOrigen: true,
        usuarioDestino: true,
      },
    });

    if (!interaccion) {
      throw new NotFoundException(`Interacción con ID ${id} no encontrada`);
    }

    return interaccion;
  }

  async update(id: number, updateInteraccionDto: UpdateInteraccionDto) {
    await this.findOne(id);

    if (
      updateInteraccionDto.UsuarioOrigenFK !== undefined &&
      updateInteraccionDto.UsuarioDestinoFK !== undefined
    ) {
      this.validarUsuariosDiferentes(
        updateInteraccionDto.UsuarioOrigenFK,
        updateInteraccionDto.UsuarioDestinoFK,
      );
    }

    if (updateInteraccionDto.UsuarioOrigenFK !== undefined) {
      await this.verificarUsuarioExiste(
        updateInteraccionDto.UsuarioOrigenFK,
        'Usuario origen',
      );
    }

    if (updateInteraccionDto.UsuarioDestinoFK !== undefined) {
      await this.verificarUsuarioExiste(
        updateInteraccionDto.UsuarioDestinoFK,
        'Usuario destino',
      );
    }

    return this.prisma.interaccion.update({
      where: {
        IdInteraccion: id,
      },
      data: updateInteraccionDto,
      include: {
        usuarioOrigen: true,
        usuarioDestino: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.interaccion.delete({
      where: {
        IdInteraccion: id,
      },
    });
  }
}