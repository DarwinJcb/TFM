/* src/estados-actividad/dto/create-estado-actividad.dto.ts: */
export class CreateEstadoActividadDto {
    estaActivo?: boolean;
    enLive?: boolean;
    ultimaConexion?: string;
    UsuarioFK!: number;
}