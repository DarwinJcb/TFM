/* src/musicas/musicas.module.ts: */
import { Module } from '@nestjs/common';
import { MusicasService } from './musicas.service.js';
import { MusicasController } from './musicas.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [MusicasController],
  providers: [MusicasService],
})
export class MusicasModule { }