/* src/prisma-usuarios.service.ts: */
import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient as PrismaUsuariosClient } from '../generated/prisma-usuarios/client.js';

@Injectable()
export class PrismaUsuariosService extends PrismaUsuariosClient {
    constructor() {
        const adapter = new PrismaPg({
            connectionString: process.env.DATABASE_URL_USUARIOS as string,
        });

        super({ adapter });
    }
}