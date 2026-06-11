/* src/matches/dto/create-match.dto.ts: */
export class CreateMatchDto {
    UsuarioUnoFK!: number;
    UsuarioDosFK!: number;
    activo?: boolean;
}