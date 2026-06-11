/* src/musicas/musicas.service.ts: */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateMusicaDto } from './dto/create-musica.dto.js';
import { UpdateMusicaDto } from './dto/update-musica.dto.js';

@Injectable()
export class MusicasService {
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

  private validarMusica(nombreCancion?: string, tipoMusica?: string) {
    if (!nombreCancion && !tipoMusica) {
      throw new BadRequestException(
        'Debe ingresar el nombre de la canción o el tipo de música',
      );
    }
  }

  async create(createMusicaDto: CreateMusicaDto) {
    await this.verificarUsuarioExiste(createMusicaDto.UsuarioFK);

    this.validarMusica(
      createMusicaDto.nombreCancion,
      createMusicaDto.tipoMusica,
    );

    return this.prisma.musica.create({
      data: createMusicaDto,
    });
  }

  findAll() {
    return this.prisma.musica.findMany({
      include: {
        usuario: true,
      },
    });
  }

  async findOne(id: number) {
    const musica = await this.prisma.musica.findUnique({
      where: {
        IdMusica: id,
      },
      include: {
        usuario: true,
      },
    });

    if (!musica) {
      throw new NotFoundException(`Música con ID ${id} no encontrada`);
    }

    return musica;
  }

  async update(id: number, updateMusicaDto: UpdateMusicaDto) {
    await this.findOne(id);

    if (updateMusicaDto.UsuarioFK !== undefined) {
      await this.verificarUsuarioExiste(updateMusicaDto.UsuarioFK);
    }

    return this.prisma.musica.update({
      where: {
        IdMusica: id,
      },
      data: updateMusicaDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.musica.delete({
      where: {
        IdMusica: id,
      },
    });
  }
}