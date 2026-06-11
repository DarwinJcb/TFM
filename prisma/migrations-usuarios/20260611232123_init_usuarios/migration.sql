-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('MASCULINO', 'FEMENINO');

-- CreateTable
CREATE TABLE "Usuario" (
    "IdUsuario" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "biografia" TEXT,
    "peso" DOUBLE PRECISION,
    "altura" DOUBLE PRECISION,
    "nacionalidad" TEXT,
    "genero" "Genero" NOT NULL,
    "numero" TEXT,
    "correo" TEXT NOT NULL,
    "signoZodiacal" TEXT,
    "queBusca" TEXT,
    "hobby" TEXT,
    "dedicacion" TEXT,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("IdUsuario")
);

-- CreateTable
CREATE TABLE "Ubicacion" (
    "IdUbicacion" SERIAL NOT NULL,
    "ciudad" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "descripcion" TEXT,
    "UsuarioFK" INTEGER NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ubicacion_pkey" PRIMARY KEY ("IdUbicacion")
);

-- CreateTable
CREATE TABLE "Foto" (
    "IdFoto" SERIAL NOT NULL,
    "urlFoto" TEXT NOT NULL,
    "descripcion" TEXT,
    "UsuarioFK" INTEGER NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Foto_pkey" PRIMARY KEY ("IdFoto")
);

-- CreateTable
CREATE TABLE "Musica" (
    "IdMusica" SERIAL NOT NULL,
    "nombreCancion" TEXT,
    "tipoMusica" TEXT,
    "UsuarioFK" INTEGER NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Musica_pkey" PRIMARY KEY ("IdMusica")
);

-- CreateTable
CREATE TABLE "CondicionComunicacion" (
    "IdCondicionComunicacion" SERIAL NOT NULL,
    "permiteMensajes" BOOLEAN NOT NULL DEFAULT true,
    "requiereMatchParaChatear" BOOLEAN NOT NULL DEFAULT true,
    "descripcion" TEXT,
    "UsuarioFK" INTEGER NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CondicionComunicacion_pkey" PRIMARY KEY ("IdCondicionComunicacion")
);

-- CreateTable
CREATE TABLE "EstadoActividad" (
    "IdEstadoActividad" SERIAL NOT NULL,
    "estaActivo" BOOLEAN NOT NULL DEFAULT false,
    "enLive" BOOLEAN NOT NULL DEFAULT false,
    "ultimaConexion" TIMESTAMP(3),
    "UsuarioFK" INTEGER NOT NULL,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EstadoActividad_pkey" PRIMARY KEY ("IdEstadoActividad")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "CondicionComunicacion_UsuarioFK_key" ON "CondicionComunicacion"("UsuarioFK");

-- CreateIndex
CREATE UNIQUE INDEX "EstadoActividad_UsuarioFK_key" ON "EstadoActividad"("UsuarioFK");

-- AddForeignKey
ALTER TABLE "Ubicacion" ADD CONSTRAINT "Ubicacion_UsuarioFK_fkey" FOREIGN KEY ("UsuarioFK") REFERENCES "Usuario"("IdUsuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Foto" ADD CONSTRAINT "Foto_UsuarioFK_fkey" FOREIGN KEY ("UsuarioFK") REFERENCES "Usuario"("IdUsuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Musica" ADD CONSTRAINT "Musica_UsuarioFK_fkey" FOREIGN KEY ("UsuarioFK") REFERENCES "Usuario"("IdUsuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CondicionComunicacion" ADD CONSTRAINT "CondicionComunicacion_UsuarioFK_fkey" FOREIGN KEY ("UsuarioFK") REFERENCES "Usuario"("IdUsuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstadoActividad" ADD CONSTRAINT "EstadoActividad_UsuarioFK_fkey" FOREIGN KEY ("UsuarioFK") REFERENCES "Usuario"("IdUsuario") ON DELETE CASCADE ON UPDATE CASCADE;
