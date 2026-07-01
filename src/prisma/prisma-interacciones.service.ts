/* src/prisma-interacciones.service.ts: */
import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient as PrismaInteraccionesClient } from '../generated/prisma-interacciones/client.js';

@Injectable()
export class PrismaInteraccionesService extends PrismaInteraccionesClient {
    constructor() {
        const adapter = new PrismaPg({
            connectionString: process.env.DATABASE_URL_INTERACCIONES as string,
        });

        super({ adapter });
    }
}