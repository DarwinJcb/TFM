/* src/suscripciones/suscripciones.module.ts: */
import { Module } from '@nestjs/common';
import { SuscripcionesService } from './suscripciones.service.js';
import { SuscripcionesController } from './suscripciones.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [SuscripcionesController],
  providers: [SuscripcionesService],
})
export class SuscripcionesModule { }