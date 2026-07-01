/* src/fotos/fotos.service.ts: */
// import { PrismaService } from '../prisma/prisma.service.js';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFotoDto } from './dto/create-foto.dto.js';
import { UpdateFotoDto } from './dto/update-foto.dto.js';
import { PrismaUsuariosService } from '../prisma/prisma-usuarios.service.js';

@Injectable()
export class FotosService {
  // constructor(private readonly prisma: PrismaService) { }
  constructor(private readonly prisma: PrismaUsuariosService) { }

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

  async create(createFotoDto: CreateFotoDto) {
    await this.verificarUsuarioExiste(createFotoDto.UsuarioFK);

    return this.prisma.foto.create({
      data: createFotoDto,
    });
  }

  findAll() {
    return this.prisma.foto.findMany({
      include: {
        usuario: true,
      },
    });
  }

  async findOne(id: number) {
    const foto = await this.prisma.foto.findUnique({
      where: {
        IdFoto: id,
      },
      include: {
        usuario: true,
      },
    });

    if (!foto) {
      throw new NotFoundException(`Foto con ID ${id} no encontrada`);
    }

    return foto;
  }

  async update(id: number, updateFotoDto: UpdateFotoDto) {
    await this.findOne(id);

    if (updateFotoDto.UsuarioFK !== undefined) {
      await this.verificarUsuarioExiste(updateFotoDto.UsuarioFK);
    }

    return this.prisma.foto.update({
      where: {
        IdFoto: id,
      },
      data: updateFotoDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.foto.delete({
      where: {
        IdFoto: id,
      },
    });
  }
}