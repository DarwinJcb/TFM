/* src/musicas/musicas.module.ts: */
// import { PrismaModule } from '../prisma/prisma.module.js';
import { Module } from '@nestjs/common';
import { MusicasService } from './musicas.service.js';
import { MusicasController } from './musicas.controller.js';
import { PrismaUsuariosModule } from '../prisma/prisma-usuarios.module.js';

@Module({
  // imports: [PrismaModule],
  imports: [PrismaUsuariosModule],
  controllers: [MusicasController],
  providers: [MusicasService],
})
export class MusicasModule { }