/* src/donaciones/donaciones.module.ts: */
// import { PrismaModule } from '../prisma/prisma.module.js';
import { Module } from '@nestjs/common';
import { DonacionesService } from './donaciones.service.js';
import { DonacionesController } from './donaciones.controller.js';
import { PrismaComercialModule } from '../prisma/prisma-comercial.module.js';
import { PrismaUsuariosModule } from '../prisma/prisma-usuarios.module.js';

@Module({
  imports: [PrismaComercialModule, PrismaUsuariosModule],
  controllers: [DonacionesController],
  providers: [DonacionesService],
})
export class DonacionesModule { }