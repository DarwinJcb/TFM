/* src/condiciones-comunicacion/dto/create-condicion-comunicacion.dto.ts: */
export class CreateCondicionComunicacionDto {
    permiteMensajes?: boolean;
    requiereMatchParaChatear?: boolean;
    descripcion?: string;
    UsuarioFK!: number;
}