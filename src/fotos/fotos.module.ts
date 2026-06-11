/* src/fotos/fotos.module.ts: */
import { Module } from '@nestjs/common';
import { FotosService } from './fotos.service.js';
import { FotosController } from './fotos.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [FotosController],
  providers: [FotosService],
})
export class FotosModule { }