/* src/chats/chats.service.ts: */
// import { PrismaService } from '../prisma/prisma.service.js';
// constructor(private readonly prisma: PrismaService) { }

import { BadRequestException, ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto.js';
import { UpdateChatDto } from './dto/update-chat.dto.js';
import { PrismaInteraccionesService } from '../prisma/prisma-interacciones.service.js';
import { PrismaUsuariosService } from '../prisma/prisma-usuarios.service.js';

@Injectable()
export class ChatsService {
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
        'Los usuarios del chat no pueden ser el mismo',
      );
    }

    return {
      usuarioMenor: Math.min(UsuarioUnoFK, UsuarioDosFK),
      usuarioMayor: Math.max(UsuarioUnoFK, UsuarioDosFK),
    };
  }

  private async verificarMatchExiste(MatchFK: number) {
    const match = await this.prisma.match.findUnique({
      where: {
        IdMatch: MatchFK,
      },
    });

    if (!match) {
      throw new NotFoundException(`Match con ID ${MatchFK} no encontrado`);
    }

    return match;
  }

  private validarMatchPerteneceAlChat(
    UsuarioUnoFK: number,
    UsuarioDosFK: number,
    MatchUsuarioUnoFK: number,
    MatchUsuarioDosFK: number,
  ) {
    if (
      UsuarioUnoFK !== MatchUsuarioUnoFK ||
      UsuarioDosFK !== MatchUsuarioDosFK
    ) {
      throw new BadRequestException(
        'El match no corresponde a los usuarios del chat',
      );
    }
  }

  async create(createChatDto: CreateChatDto) {
    await this.verificarUsuarioExiste(createChatDto.UsuarioUnoFK, 'Usuario uno');
    await this.verificarUsuarioExiste(createChatDto.UsuarioDosFK, 'Usuario dos');

    const { usuarioMenor, usuarioMayor } = this.ordenarUsuarios(
      createChatDto.UsuarioUnoFK,
      createChatDto.UsuarioDosFK,
    );

    if (createChatDto.MatchFK !== undefined) {
      const match = await this.verificarMatchExiste(createChatDto.MatchFK);

      this.validarMatchPerteneceAlChat(
        usuarioMenor,
        usuarioMayor,
        match.UsuarioUnoFK,
        match.UsuarioDosFK,
      );
    }

    const chatExistente = await this.prisma.chat.findUnique({
      where: {
        UsuarioUnoFK_UsuarioDosFK: {
          UsuarioUnoFK: usuarioMenor,
          UsuarioDosFK: usuarioMayor,
        },
      },
    });

    if (chatExistente) {
      throw new ConflictException('Ya existe un chat entre estos usuarios');
    }

    return this.prisma.chat.create({
      data: {
        UsuarioUnoFK: usuarioMenor,
        UsuarioDosFK: usuarioMayor,
        MatchFK: createChatDto.MatchFK,
      },
      include: {
        match: true,
        mensajes: true,
      },
    });
  }

  findAll() {
    return this.prisma.chat.findMany({
      include: {
        match: true,
        mensajes: true,
      },
    });
  }

  async findOne(id: number) {
    const chat = await this.prisma.chat.findUnique({
      where: {
        IdChat: id,
      },
      include: {
        match: true,
        mensajes: true,
      },
    });

    if (!chat) {
      throw new NotFoundException(`Chat con ID ${id} no encontrado`);
    }

    return chat;
  }

  async update(id: number, updateChatDto: UpdateChatDto) {
    const chatActual = await this.findOne(id);

    if (updateChatDto.MatchFK !== undefined) {
      const match = await this.verificarMatchExiste(updateChatDto.MatchFK);

      this.validarMatchPerteneceAlChat(
        chatActual.UsuarioUnoFK,
        chatActual.UsuarioDosFK,
        match.UsuarioUnoFK,
        match.UsuarioDosFK,
      );
    }

    return this.prisma.chat.update({
      where: {
        IdChat: id,
      },
      data: {
        MatchFK: updateChatDto.MatchFK,
      },
      include: {
        match: true,
        mensajes: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.chat.delete({
      where: {
        IdChat: id,
      },
    });
  }
}