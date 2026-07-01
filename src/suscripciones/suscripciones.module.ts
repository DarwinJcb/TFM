/* src/suscripciones/suscripciones.module.ts: */
// import { PrismaModule } from '../prisma/prisma.module.js';
import { Module } from '@nestjs/common';
import { SuscripcionesService } from './suscripciones.service.js';
import { SuscripcionesController } from './suscripciones.controller.js';
import { PrismaComercialModule } from '../prisma/prisma-comercial.module.js';
import { PrismaUsuariosModule } from '../prisma/prisma-usuarios.module.js';

@Module({
  imports: [PrismaComercialModule, PrismaUsuariosModule],
  controllers: [SuscripcionesController],
  providers: [SuscripcionesService],
})
export class SuscripcionesModule { }