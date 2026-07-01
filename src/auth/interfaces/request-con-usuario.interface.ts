/* src/auth/interfaces/request-con-usuario.interface.ts: */
import { Request } from 'express';
import { UsuarioAutenticado } from './usuario-autenticado.interface.js';

export interface RequestConUsuario extends Request {
    user: UsuarioAutenticado;
}