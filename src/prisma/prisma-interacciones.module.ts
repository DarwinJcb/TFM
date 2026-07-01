/* src/prisma-interacciones.module.ts: */
import { Module } from '@nestjs/common';
import { PrismaInteraccionesService } from './prisma-interacciones.service.js';

@Module({
  providers: [PrismaInteraccionesService],
  exports: [PrismaInteraccionesService],
})
export class PrismaInteraccionesModule { }