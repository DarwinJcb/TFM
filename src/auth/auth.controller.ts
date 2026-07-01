/* src/auth/auth.controller.ts: */
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegistroDto } from './dto/registro.dto.js';
import { InicioSesionDto } from './dto/inicio-sesion.dto.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { UsuarioActual } from './decorators/usuario-actual.decorator.js';
import type { UsuarioAutenticado } from './interfaces/usuario-autenticado.interface.js';
import type { RespuestaAutenticacion } from './interfaces/respuesta-autenticacion.interface.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('registro')
    registro(@Body() registroDto: RegistroDto): Promise<RespuestaAutenticacion> {
        return this.authService.registro(registroDto);
    }

    @Post('login')
    inicioSesion(
        @Body() inicioSesionDto: InicioSesionDto,
    ): Promise<RespuestaAutenticacion> {
        return this.authService.inicioSesion(inicioSesionDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('perfil')
    perfil(@UsuarioActual() usuario: UsuarioAutenticado): UsuarioAutenticado {
        return usuario;
    }
}