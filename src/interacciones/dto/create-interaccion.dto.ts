/* src/interacciones/dto/create-interaccion.dto.ts: */
export class CreateInteraccionDto {
    tipo!: 'LIKE' | 'NO_LIKE' | 'EVITAR' | 'REPORTAR' | 'SUPERLIKE';
    descripcion?: string;
    UsuarioOrigenFK!: number;
    UsuarioDestinoFK!: number;
}