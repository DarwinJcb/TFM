/* src/matches/matches.service.ts: */
// import { PrismaService } from '../prisma/prisma.service.js';
// constructor(private readonly prisma: PrismaService) { }
import { BadRequestException, ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto.js';
import { UpdateMatchDto } from './dto/update-match.dto.js';
import { PrismaInteraccionesService } from '../prisma/prisma-interacciones.service.js';
import { PrismaUsuariosService } from '../prisma/prisma-usuarios.service.js';

@Injectable()
export class MatchesService {
  constructor(
    private readonly prisma: PrismaInteraccionesService,
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

  private ordenarUsuarios(UsuarioUnoFK: number, UsuarioDosFK: number) {
    if (UsuarioUnoFK === UsuarioDosFK) {
      throw new BadRequestException(
        'Los usuarios del match no pueden ser el mismo',
      );
    }

    return {
      usuarioMenor: Math.min(UsuarioUnoFK, UsuarioDosFK),
      usuarioMayor: Math.max(UsuarioUnoFK, UsuarioDosFK),
    };
  }

  async create(createMatchDto: CreateMatchDto) {
    await this.verificarUsuarioExiste(createMatchDto.UsuarioUnoFK, 'Usuario uno');
    await this.verificarUsuarioExiste(createMatchDto.UsuarioDosFK, 'Usuario dos');

    const { usuarioMenor, usuarioMayor } = this.ordenarUsuarios(
      createMatchDto.UsuarioUnoFK,
      createMatchDto.UsuarioDosFK,
    );

    const matchExistente = await this.prisma.match.findUnique({
      where: {
        UsuarioUnoFK_UsuarioDosFK: {
          UsuarioUnoFK: usuarioMenor,
          UsuarioDosFK: usuarioMayor,
        },
      },
    });

    if (matchExistente) {
      throw new ConflictException('Este match ya existe');
    }

    return this.prisma.match.create({
      data: {
        UsuarioUnoFK: usuarioMenor,
        UsuarioDosFK: usuarioMayor,
        activo: createMatchDto.activo,
      },
      include: {
        chats: true,
      },
    });
  }

  findAll() {
    return this.prisma.match.findMany({
      include: {
        chats: true,
      },
    });
  }

  async findOne(id: number) {
    const match = await this.prisma.match.findUnique({
      where: {
        IdMatch: id,
      },
      include: {
        chats: true,
      },
    });

    if (!match) {
      throw new NotFoundException(`Match con ID ${id} no encontrado`);
    }

    return match;
  }

  async update(id: number, updateMatchDto: UpdateMatchDto) {
    await this.findOne(id);

    return this.prisma.match.update({
      where: {
        IdMatch: id,
      },
      data: {
        activo: updateMatchDto.activo,
      },
      include: {
        chats: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.match.delete({
      where: {
        IdMatch: id,
      },
    });
  }
}