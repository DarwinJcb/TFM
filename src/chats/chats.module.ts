/* src/chats/chats.module.ts: */
// import { PrismaModule } from '../prisma/prisma.module.js';
import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service.js';
import { ChatsController } from './chats.controller.js';
import { PrismaInteraccionesModule } from '../prisma/prisma-interacciones.module.js';

@Module({
  // imports: [PrismaModule],
  imports: [PrismaInteraccionesModule],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule { }