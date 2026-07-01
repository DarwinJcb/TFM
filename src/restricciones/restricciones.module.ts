/* src/restricciones/restricciones.module.ts: */
// import { PrismaModule } from '../prisma/prisma.module.js';
import { Module } from '@nestjs/common';
import { RestriccionesService } from './restricciones.service.js';
import { RestriccionesController } from './restricciones.controller.js';
import { PrismaComercialModule } from '../prisma/prisma-comercial.module.js';

@Module({
  // imports: [PrismaModule],
  imports: [PrismaComercialModule],
  controllers: [RestriccionesController],
  providers: [RestriccionesService],
})
export class RestriccionesModule { }