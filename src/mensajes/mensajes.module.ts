/* src/mensajes/mensajes.module.ts: */
// import { PrismaModule } from '../prisma/prisma.module.js';
import { Module } from '@nestjs/common';
import { MensajesService } from './mensajes.service.js';
import { MensajesController } from './mensajes.controller.js';
import { PrismaInteraccionesModule } from '../prisma/prisma-interacciones.module.js';
import { PrismaUsuariosModule } from '../prisma/prisma-usuarios.module.js';

@Module({
  // imports: [PrismaModule],
  imports: [PrismaInteraccionesModule, PrismaUsuariosModule],
  controllers: [MensajesController],
  providers: [MensajesService],
})
export class MensajesModule { }