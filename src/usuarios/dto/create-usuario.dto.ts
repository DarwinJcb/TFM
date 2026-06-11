/* src/usuarios/dto/create-usuario.dto.ts: */
export class CreateUsuarioDto {
    nombre!: string;
    edad!: number;
    biografia?: string;
    peso?: number;
    altura?: number;
    nacionalidad?: string;
    genero!: 'MASCULINO' | 'FEMENINO';
    numero?: string;
    correo!: string;
    signoZodiacal?: string;
    queBusca?: string;
    hobby?: string;
    dedicacion?: string;
}