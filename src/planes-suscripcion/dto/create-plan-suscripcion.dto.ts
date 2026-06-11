/* src/planes-suscripcion/dto/create-plan-suscripcion.dto.ts: */
export class CreatePlanSuscripcionDto {
    tipo!: 'BRONCE' | 'GOLD' | 'PREMIUM' | 'PLATINO';
    valor!: string;
    ventajas?: string;
    contenido?: string;
    mensajesIlimitados?: boolean;
}