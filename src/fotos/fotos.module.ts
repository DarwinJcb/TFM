/* src/fotos/fotos.module.ts: */
// import { PrismaModule } from '../prisma/prisma.module.js';
import { Module } from '@nestjs/common';
import { FotosService } from './fotos.service.js';
import { FotosController } from './fotos.controller.js';
import { PrismaUsuariosModule } from '../prisma/prisma-usuarios.module.js';

@Module({
  // imports: [PrismaModule],
  imports: [PrismaUsuariosModule],
  controllers: [FotosController],
  providers: [FotosService],
})
export class FotosModule { }