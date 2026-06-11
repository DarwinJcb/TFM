/* src/suscripciones/dto/create-suscripcion.dto.ts: */
export class CreateSuscripcionDto {
    UsuarioFK!: number;
    PlanSuscripcionFK!: number;
    fechaFin?: string;
    activa?: boolean;
}