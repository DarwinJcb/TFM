/* src/planes-suscripcion/planes-suscripcion.module.ts: */
// import { PrismaModule } from '../prisma/prisma.module.js';
import { Module } from '@nestjs/common';
import { PlanesSuscripcionService } from './planes-suscripcion.service.js';
import { PlanesSuscripcionController } from './planes-suscripcion.controller.js';
import { PrismaComercialModule } from '../prisma/prisma-comercial.module.js';

@Module({
  // imports: [PrismaModule],
  imports: [PrismaComercialModule],
  controllers: [PlanesSuscripcionController],
  providers: [PlanesSuscripcionService],
})
export class PlanesSuscripcionModule { }