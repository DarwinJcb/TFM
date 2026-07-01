/* src/donaciones/donaciones.service.ts: */
// import { PrismaService } from '../prisma/prisma.service.js';
// constructor(private readonly prisma: PrismaService) { }
import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { CreateDonacionDto } from './dto/create-donacion.dto.js';
import { UpdateDonacionDto } from './dto/update-donacion.dto.js';
import { PrismaComercialService } from '../prisma/prisma-comercial.service.js';
import { PrismaUsuariosService } from '../prisma/prisma-usuarios.service.js';

@Injectable()
export class DonacionesService {
  constructor(
    private readonly prisma: PrismaComercialService,
    private readonly prismaUsuarios: PrismaUsuariosService,
  ) { }

  private async verificarUsuarioExiste(idUsuario: number, nombreCampo: string) {
    const usuario = await this.prismaUsuarios.usuario.findUnique({
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
    });
  }

  findAll() {
    return this.prisma.donacion.findMany();
  }

  async findOne(id: number) {
    const donacion = await this.prisma.donacion.findUnique({
      where: {
        IdDonacion: id,
      },
    });

    if (!donacion) {
      throw new NotFoundException(`Donación con ID ${id} no encontrada`);
    }

    return donacion;
  }

  async update(id: number, updateDonacionDto: UpdateDonacionDto) {
    const donacionActual = await this.findOne(id);

    const UsuarioDonanteFK =
      updateDonacionDto.UsuarioDonanteFK ?? donacionActual.UsuarioDonanteFK;

    const UsuarioReceptorFK =
      updateDonacionDto.UsuarioReceptorFK ?? donacionActual.UsuarioReceptorFK;

    this.validarUsuariosDiferentes(UsuarioDonanteFK, UsuarioReceptorFK);

    await this.verificarUsuarioExiste(UsuarioDonanteFK, 'Usuario donante');
    await this.verificarUsuarioExiste(UsuarioReceptorFK, 'Usuario receptor');

    return this.prisma.donacion.update({
      where: {
        IdDonacion: id,
      },
      data: updateDonacionDto,
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