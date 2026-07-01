/* src/auth/dto/registro.dto.ts: */
export class RegistroDto {
    nombre!: string;
    edad!: number;
    biografia?: string;
    peso?: number;
    altura?: number;
    nacionalidad?: string;
    genero!: 'MASCULINO' | 'FEMENINO';
    numero?: string;
    correo!: string;
    contrasena!: string;
    signoZodiacal?: string;
    queBusca?: string;
    hobby?: string;
    dedicacion?: string;
}