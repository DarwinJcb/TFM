/* src/musicas/dto/create-musica.dto.ts: */
export class CreateMusicaDto {
    nombreCancion?: string;
    tipoMusica?: string;
    UsuarioFK!: number;
}