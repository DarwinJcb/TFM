/* src/donaciones/donaciones.service.ts: */
import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateDonacionDto } from './dto/create-donacion.dto.js';
import { UpdateDonacionDto } from './dto/update-donacion.dto.js';

@Injectable()
export class DonacionesService {
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
    UsuarioDonanteFK: number,
    UsuarioReceptorFK: number,
  ) {
    if (UsuarioDonanteFK === UsuarioReceptorFK) {
      throw new BadRequestException(
        'El usuario donante y el usuario receptor no pueden ser el mismo',
      );
    }
  }

  async create(createDonacionDto: CreateDonacionDto) {
    this.validarUsuariosDiferentes(
      createDonacionDto.UsuarioDonanteFK,
      createDonacionDto.UsuarioReceptorFK,
    );

    await this.verificarUsuarioExiste(
      createDonacionDto.UsuarioDonanteFK,
      'Usuario donante',
    );

    await this.verificarUsuarioExiste(
      createDonacionDto.UsuarioReceptorFK,
      'Usuario receptor',
    );

    return this.prisma.donacion.create({
      data: createDonacionDto,
      include: {
        usuarioDonante: true,
        usuarioReceptor: true,
      },
    });
  }

  findAll() {
    return this.prisma.donacion.findMany({
      include: {
        usuarioDonante: true,
        usuarioReceptor: true,
      },
    });
  }

  async findOne(id: number) {
    const donacion = await this.prisma.donacion.findUnique({
      where: {
        IdDonacion: id,
      },
      include: {
        usuarioDonante: true,
        usuarioReceptor: true,
      },
    });

    if (!donacion) {
      throw new NotFoundException(`Donación con ID ${id} no encontrada`);
    }

    return donacion;
  }

  async update(id: number, updateDonacionDto: UpdateDonacionDto) {
    await this.findOne(id);

    if (
      updateDonacionDto.UsuarioDonanteFK !== undefined &&
      updateDonacionDto.UsuarioReceptorFK !== undefined
    ) {
      this.validarUsuariosDiferentes(
        updateDonacionDto.UsuarioDonanteFK,
        updateDonacionDto.UsuarioReceptorFK,
      );
    }

    if (updateDonacionDto.UsuarioDonanteFK !== undefined) {
      await this.verificarUsuarioExiste(
        updateDonacionDto.UsuarioDonanteFK,
        'Usuario donante',
      );
    }

    if (updateDonacionDto.UsuarioReceptorFK !== undefined) {
      await this.verificarUsuarioExiste(
        updateDonacionDto.UsuarioReceptorFK,
        'Usuario receptor',
      );
    }

    return this.prisma.donacion.update({
      where: {
        IdDonacion: id,
      },
      data: updateDonacionDto,
      include: {
        usuarioDonante: true,
        usuarioReceptor: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.donacion.delete({
      where: {
        IdDonacion: id,
      },
    });
  }
}