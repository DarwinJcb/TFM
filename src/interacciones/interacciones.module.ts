/* src/interacciones/interacciones.module.ts: */
// import { PrismaModule } from '../prisma/prisma.module.js';
import { Module } from '@nestjs/common';
import { InteraccionesService } from './interacciones.service.js';
import { InteraccionesController } from './interacciones.controller.js';
import { PrismaInteraccionesModule } from '../prisma/prisma-interacciones.module.js';
import { PrismaUsuariosModule } from '../prisma/prisma-usuarios.module.js';

@Module({
  // imports: [PrismaModule],
  imports: [PrismaInteraccionesModule, PrismaUsuariosModule],
  controllers: [InteraccionesController],
  providers: [InteraccionesService],
})
export class InteraccionesModule { }