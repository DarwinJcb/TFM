/* src/auth/strategies/jwt.strategy.ts: */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface.js';
import { UsuarioAutenticado } from '../interfaces/usuario-autenticado.interface.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET ?? 'clave_temporal',
        });
    }

    validate(payload: JwtPayload): UsuarioAutenticado {
        return {
            IdUsuario: payload.sub,
            correo: payload.correo,
            nombre: payload.nombre,
        };
    }
}