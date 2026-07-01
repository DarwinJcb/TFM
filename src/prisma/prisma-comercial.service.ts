/* src/prisma-comercial.service.ts: */
import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient as PrismaComercialClient } from '../generated/prisma-comercial/client.js';

@Injectable()
export class PrismaComercialService extends PrismaComercialClient {
    constructor() {
        const adapter = new PrismaPg({
            connectionString: process.env.DATABASE_URL_COMERCIAL as string,
        });

        super({ adapter });
    }
}