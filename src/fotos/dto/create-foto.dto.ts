/* src/fotos/dto/create-foto.dto.ts: */
export class CreateFotoDto {
    urlFoto!: string;
    descripcion?: string;
    UsuarioFK!: number;
}