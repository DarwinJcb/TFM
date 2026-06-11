/* src/donaciones/donaciones.module.ts: */
import { Module } from '@nestjs/common';
import { DonacionesService } from './donaciones.service.js';
import { DonacionesController } from './donaciones.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [DonacionesController],
  providers: [DonacionesService],
})
export class DonacionesModule { }