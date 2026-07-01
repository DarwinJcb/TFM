/* src/interacciones/interacciones.service.ts: */
// import { PrismaService } from '../prisma/prisma.service.js';
// constructor(private readonly prisma: PrismaService) { }
import { BadRequestException, ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import { CreateInteraccionDto } from './dto/create-interaccion.dto.js';
import { UpdateInteraccionDto } from './dto/update-interaccion.dto.js';
import { PrismaInteraccionesService } from '../prisma/prisma-interacciones.service.js';
import { PrismaUsuariosService } from '../prisma/prisma-usuarios.service.js';

@Injectable()
export class InteraccionesService {
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
    return this.prisma.interaccion.findMany();
  }

  async findOne(id: number) {
    const interaccion = await this.prisma.interaccion.findUnique({
      where: {
        IdInteraccion: id,
      },
    });

    if (!interaccion) {
      throw new NotFoundException(`Interacción con ID ${id} no encontrada`);
    }

    return interaccion;
  }

  async update(id: number, updateInteraccionDto: UpdateInteraccionDto) {
    const interaccionActual = await this.findOne(id);

    const UsuarioOrigenFK =
      updateInteraccionDto.UsuarioOrigenFK ?? interaccionActual.UsuarioOrigenFK;

    const UsuarioDestinoFK =
      updateInteraccionDto.UsuarioDestinoFK ??
      interaccionActual.UsuarioDestinoFK;

    const tipo = updateInteraccionDto.tipo ?? interaccionActual.tipo;

    this.validarUsuariosDiferentes(UsuarioOrigenFK, UsuarioDestinoFK);

    await this.verificarUsuarioExiste(UsuarioOrigenFK, 'Usuario origen');
    await this.verificarUsuarioExiste(UsuarioDestinoFK, 'Usuario destino');

    const interaccionExistente = await this.prisma.interaccion.findUnique({
      where: {
        UsuarioOrigenFK_UsuarioDestinoFK_tipo: {
          UsuarioOrigenFK,
          UsuarioDestinoFK,
          tipo,
        },
      },
    });

    if (
      interaccionExistente &&
      interaccionExistente.IdInteraccion !== id
    ) {
      throw new ConflictException(
        'Esta interacción ya existe entre estos usuarios',
      );
    }

    const interaccionActualizada = await this.prisma.interaccion.update({
      where: {
        IdInteraccion: id,
      },
      data: updateInteraccionDto,
    });

    if (interaccionActualizada.tipo === 'LIKE') {
      await this.crearMatchSiExisteLikeMutuo(
        interaccionActualizada.UsuarioOrigenFK,
        interaccionActualizada.UsuarioDestinoFK,
      );
    }

    return interaccionActualizada;
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