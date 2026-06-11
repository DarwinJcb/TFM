/* src/mensajes/mensajes.module.ts: */
import { Module } from '@nestjs/common';
import { MensajesService } from './mensajes.service.js';
import { MensajesController } from './mensajes.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [MensajesController],
  providers: [MensajesService],
})
export class MensajesModule { }