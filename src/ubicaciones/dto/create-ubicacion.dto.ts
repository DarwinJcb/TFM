/* src/ubicaciones/dto/create-ubicacion.dto.ts: */
export class CreateUbicacionDto {
    ciudad!: string;
    pais!: string;
    descripcion?: string;
    UsuarioFK!: number;
}