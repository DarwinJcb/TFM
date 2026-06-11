/* src/chats/dto/create-chat.dto.ts: */
export class CreateChatDto {
    UsuarioUnoFK!: number;
    UsuarioDosFK!: number;
    MatchFK?: number;
}