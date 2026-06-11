/* src/interacciones/interacciones.module.ts: */
import { Module } from '@nestjs/common';
import { InteraccionesService } from './interacciones.service.js';
import { InteraccionesController } from './interacciones.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [InteraccionesController],
  providers: [InteraccionesService],
})
export class InteraccionesModule { }