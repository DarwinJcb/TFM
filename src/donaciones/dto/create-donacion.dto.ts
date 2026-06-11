/* src/donaciones/dto/create-donacion.dto.ts: */
export class CreateDonacionDto {
    monto!: string;
    mensaje?: string;
    UsuarioDonanteFK!: number;
    UsuarioReceptorFK!: number;
}