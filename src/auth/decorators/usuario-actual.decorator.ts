/* src/auth/decorators/usuario-actual.decorator.ts: */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestConUsuario } from '../interfaces/request-con-usuario.interface.js';
import { UsuarioAutenticado } from '../interfaces/usuario-autenticado.interface.js';

export const UsuarioActual = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext): UsuarioAutenticado => {
        const request = ctx.switchToHttp().getRequest<RequestConUsuario>();
        return request.user;
    },
);