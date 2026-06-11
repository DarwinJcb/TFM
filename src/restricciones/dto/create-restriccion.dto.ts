/* src/restricciones/dto/create-restriccion.dto.ts: */
export class CreateRestriccionDto {
    descripcion!: string;
    activa?: boolean;
    PlanSuscripcionFK?: number;
}