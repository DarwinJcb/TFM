/* src/auth/auth.service.ts: */
import {
    BadRequestException,
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaUsuariosService } from '../prisma/prisma-usuarios.service.js';
import { RegistroDto } from './dto/registro.dto.js';
import { InicioSesionDto } from './dto/inicio-sesion.dto.js';
import { JwtPayload } from './interfaces/jwt-payload.interface.js';
import { UsuarioAutenticado } from './interfaces/usuario-autenticado.interface.js';
import { RespuestaAutenticacion } from './interfaces/respuesta-autenticacion.interface.js';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaUsuarios: PrismaUsuariosService,
        private readonly jwtService: JwtService,
    ) { }

    async registro(registroDto: RegistroDto): Promise<RespuestaAutenticacion> {
        if (registroDto.contrasena.length < 6) {
            throw new BadRequestException(
                'La contraseña debe tener al menos 6 caracteres',
            );
        }

        const usuarioExistente = await this.prismaUsuarios.usuario.findUnique({
            where: {
                correo: registroDto.correo,
            },
        });

        if (usuarioExistente) {
            throw new ConflictException('Ya existe un usuario con ese correo');
        }

        const contrasenaHash = await bcrypt.hash(registroDto.contrasena, 10);

        const usuario = await this.prismaUsuarios.usuario.create({
            data: {
                nombre: registroDto.nombre,
                edad: registroDto.edad,
                biografia: registroDto.biografia,
                peso: registroDto.peso,
                altura: registroDto.altura,
                nacionalidad: registroDto.nacionalidad,
                genero: registroDto.genero,
                numero: registroDto.numero,
                correo: registroDto.correo,
                contrasenaHash,
                signoZodiacal: registroDto.signoZodiacal,
                queBusca: registroDto.queBusca,
                hobby: registroDto.hobby,
                dedicacion: registroDto.dedicacion,
            },
        });

        return this.generarRespuestaAutenticacion({
            IdUsuario: usuario.IdUsuario,
            correo: usuario.correo,
            nombre: usuario.nombre,
        });
    }

    async inicioSesion(
        inicioSesionDto: InicioSesionDto,
    ): Promise<RespuestaAutenticacion> {
        const usuario = await this.prismaUsuarios.usuario.findUnique({
            where: {
                correo: inicioSesionDto.correo,
            },
        });

        if (!usuario || !usuario.contrasenaHash) {
            throw new UnauthorizedException('Credenciales incorrectas');
        }

        const contrasenaValida = await bcrypt.compare(
            inicioSesionDto.contrasena,
            usuario.contrasenaHash,
        );

        if (!contrasenaValida) {
            throw new UnauthorizedException('Credenciales incorrectas');
        }

        return this.generarRespuestaAutenticacion({
            IdUsuario: usuario.IdUsuario,
            correo: usuario.correo,
            nombre: usuario.nombre,
        });
    }

    private generarRespuestaAutenticacion(
        usuario: UsuarioAutenticado,
    ): RespuestaAutenticacion {
        const payload: JwtPayload = {
            sub: usuario.IdUsuario,
            correo: usuario.correo,
            nombre: usuario.nombre,
        };

        return {
            access_token: this.jwtService.sign(payload),
            usuario,
        };
    }
}