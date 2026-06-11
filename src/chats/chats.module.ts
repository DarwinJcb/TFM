/* src/chats/chats.module.ts: */
import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service.js';
import { ChatsController } from './chats.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule { }