/* src/auth/interfaces/respuesta-autenticacion.interface.ts: */
import { UsuarioAutenticado } from './usuario-autenticado.interface.js';

export interface RespuestaAutenticacion {
    access_token: string;
    usuario: UsuarioAutenticado;
}