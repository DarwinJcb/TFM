/* src/auth/auth.module.ts: */
import 'dotenv/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JwtStrategy } from './strategies/jwt.strategy.js';
import { PrismaUsuariosModule } from '../prisma/prisma-usuarios.module.js';

type TiempoExpiracionJwt = | `${number}s` | `${number}m` | `${number}h` | `${number}d` | number;

const jwtSecret = process.env.JWT_SECRET ?? 'clave_temporal';
const jwtExpiresIn = (process.env.JWT_EXPIRES_IN ?? '1h') as TiempoExpiracionJwt;

@Module({
    imports: [
        PrismaUsuariosModule,
        PassportModule,
        JwtModule.register({
            secret: jwtSecret,
            signOptions: {
                expiresIn: jwtExpiresIn,
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule { }