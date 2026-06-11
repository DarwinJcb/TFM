/* src/planes-suscripcion/planes-suscripcion.module.ts: */
import { Module } from '@nestjs/common';
import { PlanesSuscripcionService } from './planes-suscripcion.service.js';
import { PlanesSuscripcionController } from './planes-suscripcion.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [PlanesSuscripcionController],
  providers: [PlanesSuscripcionService],
})
export class PlanesSuscripcionModule { }