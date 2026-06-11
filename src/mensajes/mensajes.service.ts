/* src/mensajes/mensajes.service.ts: */
import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateMensajeDto } from './dto/create-mensaje.dto.js';
import { UpdateMensajeDto } from './dto/update-mensaje.dto.js';

@Injectable()
export class MensajesService {
  constructor(private readonly prisma: PrismaService) { }

  private async verificarChatExiste(ChatFK: number) {
    const chat = await this.prisma.chat.findUnique({
      where: {
        IdChat: ChatFK,
      },
    });

    if (!chat) {
      throw new NotFoundException(`Chat con ID ${ChatFK} no encontrado`);
    }

    return chat;
  }

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

  private async verificarUsuarioPerteneceAlChat(
    ChatFK: number,
    UsuarioFK: number,
  ) {
    const chat = await this.verificarChatExiste(ChatFK);

    if (chat.UsuarioUnoFK !== UsuarioFK && chat.UsuarioDosFK !== UsuarioFK) {
      throw new BadRequestException(
        'El usuario no pertenece a este chat',
      );
    }

    return chat;
  }

  async create(createMensajeDto: CreateMensajeDto) {
    await this.verificarUsuarioExiste(createMensajeDto.UsuarioFK);
    await this.verificarUsuarioPerteneceAlChat(
      createMensajeDto.ChatFK,
      createMensajeDto.UsuarioFK,
    );

    return this.prisma.mensaje.create({
      data: createMensajeDto,
      include: {
        chat: true,
        usuario: true,
      },
    });
  }

  findAll() {
    return this.prisma.mensaje.findMany({
      include: {
        chat: true,
        usuario: true,
      },
    });
  }

  async findOne(id: number) {
    const mensaje = await this.prisma.mensaje.findUnique({
      where: {
        IdMensaje: id,
      },
      include: {
        chat: true,
        usuario: true,
      },
    });

    if (!mensaje) {
      throw new NotFoundException(`Mensaje con ID ${id} no encontrado`);
    }

    return mensaje;
  }

  async update(id: number, updateMensajeDto: UpdateMensajeDto) {
    await this.findOne(id);

    if (updateMensajeDto.UsuarioFK !== undefined) {
      await this.verificarUsuarioExiste(updateMensajeDto.UsuarioFK);
    }

    if (
      updateMensajeDto.ChatFK !== undefined &&
      updateMensajeDto.UsuarioFK !== undefined
    ) {
      await this.verificarUsuarioPerteneceAlChat(
        updateMensajeDto.ChatFK,
        updateMensajeDto.UsuarioFK,
      );
    }

    return this.prisma.mensaje.update({
      where: {
        IdMensaje: id,
      },
      data: updateMensajeDto,
      include: {
        chat: true,
        usuario: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.mensaje.delete({
      where: {
        IdMensaje: id,
      },
    });
  }
}