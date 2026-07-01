/* src/prisma-comercial/prisma-comercial.module.ts: */
import { Module } from '@nestjs/common';
import { PrismaComercialService } from './prisma-comercial.service.js';

@Module({
    providers: [PrismaComercialService],
    exports: [PrismaComercialService],
})
export class PrismaComercialModule { }