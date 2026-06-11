/* src/mensajes/dto/create-mensaje.dto.ts: */
export class CreateMensajeDto {
    contenido!: string;
    leido?: boolean;
    ChatFK!: number;
    UsuarioFK!: number;
}