/* src/chats/chats.module.ts: */
// import { PrismaModule } from '../prisma/prisma.module.js';
import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service.js';
import { ChatsController } from './chats.controller.js';
import { PrismaInteraccionesModule } from '../prisma/prisma-interacciones.module.js';
import { PrismaUsuariosModule } from '../prisma/prisma-usuarios.module.js';

@Module({
  // imports: [PrismaModule],
  imports: [PrismaInteraccionesModule, PrismaUsuariosModule],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule { }