/* src/chats/dto/update-chat.dto.ts: */
import { PartialType } from '@nestjs/mapped-types';
import { CreateChatDto } from './create-chat.dto.js';

export class UpdateChatDto extends PartialType(CreateChatDto) { }