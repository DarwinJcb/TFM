-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('MASCULINO', 'FEMENINO');

-- CreateEnum
CREATE TYPE "TipoSuscripcion" AS ENUM ('BRONCE', 'GOLD', 'PREMIUM', 'PLATINO');

-- CreateEnum
CREATE TYPE "TipoInteraccion" AS ENUM ('LIKE', 'NO_LIKE', 'EVITAR', 'REPORTAR', 'SUPERLIKE');

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
CREATE TABLE "PlanSuscripcion" (
    "IdPlanSuscripcion" SERIAL NOT NULL,
    "tipo" "TipoSuscripcion" NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "ventajas" TEXT,
    "contenido" TEXT,
    "mensajesIlimitados" BOOLEAN NOT NULL DEFAULT false,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanSuscripcion_pkey" PRIMARY KEY ("IdPlanSuscripcion")
);

-- CreateTable
CREATE TABLE "Suscripcion" (
    "IdSuscripcion" SERIAL NOT NULL,
    "UsuarioFK" INTEGER NOT NULL,
    "PlanSuscripcionFK" INTEGER NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaFin" TIMESTAMP(3),
    "activa" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Suscripcion_pkey" PRIMARY KEY ("IdSuscripcion")
);

-- CreateTable
CREATE TABLE "Restriccion" (
    "IdRestriccion" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "PlanSuscripcionFK" INTEGER,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Restriccion_pkey" PRIMARY KEY ("IdRestriccion")
);

-- CreateTable
CREATE TABLE "Interaccion" (
    "IdInteraccion" SERIAL NOT NULL,
    "tipo" "TipoInteraccion" NOT NULL,
    "descripcion" TEXT,
    "UsuarioOrigenFK" INTEGER NOT NULL,
    "UsuarioDestinoFK" INTEGER NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Interaccion_pkey" PRIMARY KEY ("IdInteraccion")
);

-- CreateTable
CREATE TABLE "Match" (
    "IdMatch" SERIAL NOT NULL,
    "UsuarioUnoFK" INTEGER NOT NULL,
    "UsuarioDosFK" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("IdMatch")
);

-- CreateTable
CREATE TABLE "Chat" (
    "IdChat" SERIAL NOT NULL,
    "UsuarioUnoFK" INTEGER NOT NULL,
    "UsuarioDosFK" INTEGER NOT NULL,
    "MatchFK" INTEGER,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("IdChat")
);

-- CreateTable
CREATE TABLE "Mensaje" (
    "IdMensaje" SERIAL NOT NULL,
    "contenido" TEXT NOT NULL,
    "leido" BOOLEAN NOT NULL DEFAULT false,
    "ChatFK" INTEGER NOT NULL,
    "UsuarioFK" INTEGER NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mensaje_pkey" PRIMARY KEY ("IdMensaje")
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

-- CreateTable
CREATE TABLE "Donacion" (
    "IdDonacion" SERIAL NOT NULL,
    "monto" DECIMAL(10,2) NOT NULL,
    "mensaje" TEXT,
    "UsuarioDonanteFK" INTEGER NOT NULL,
    "UsuarioReceptorFK" INTEGER NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Donacion_pkey" PRIMARY KEY ("IdDonacion")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "PlanSuscripcion_tipo_key" ON "PlanSuscripcion"("tipo");

-- CreateIndex
CREATE UNIQUE INDEX "Suscripcion_UsuarioFK_key" ON "Suscripcion"("UsuarioFK");

-- CreateIndex
CREATE UNIQUE INDEX "Interaccion_UsuarioOrigenFK_UsuarioDestinoFK_tipo_key" ON "Interaccion"("UsuarioOrigenFK", "UsuarioDestinoFK", "tipo");

-- CreateIndex
CREATE UNIQUE INDEX "Match_UsuarioUnoFK_UsuarioDosFK_key" ON "Match"("UsuarioUnoFK", "UsuarioDosFK");

-- CreateIndex
CREATE UNIQUE INDEX "Chat_MatchFK_key" ON "Chat"("MatchFK");

-- CreateIndex
CREATE UNIQUE INDEX "Chat_UsuarioUnoFK_UsuarioDosFK_key" ON "Chat"("UsuarioUnoFK", "UsuarioDosFK");

-- CreateIndex
CREATE INDEX "Mensaje_ChatFK_idx" ON "Mensaje"("ChatFK");

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
ALTER TABLE "Suscripcion" ADD CONSTRAINT "Suscripcion_UsuarioFK_fkey" FOREIGN KEY ("UsuarioFK") REFERENCES "Usuario"("IdUsuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suscripcion" ADD CONSTRAINT "Suscripcion_PlanSuscripcionFK_fkey" FOREIGN KEY ("PlanSuscripcionFK") REFERENCES "PlanSuscripcion"("IdPlanSuscripcion") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restriccion" ADD CONSTRAINT "Restriccion_PlanSuscripcionFK_fkey" FOREIGN KEY ("PlanSuscripcionFK") REFERENCES "PlanSuscripcion"("IdPlanSuscripcion") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaccion" ADD CONSTRAINT "Interaccion_UsuarioOrigenFK_fkey" FOREIGN KEY ("UsuarioOrigenFK") REFERENCES "Usuario"("IdUsuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaccion" ADD CONSTRAINT "Interaccion_UsuarioDestinoFK_fkey" FOREIGN KEY ("UsuarioDestinoFK") REFERENCES "Usuario"("IdUsuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_UsuarioUnoFK_fkey" FOREIGN KEY ("UsuarioUnoFK") REFERENCES "Usuario"("IdUsuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_UsuarioDosFK_fkey" FOREIGN KEY ("UsuarioDosFK") REFERENCES "Usuario"("IdUsuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_UsuarioUnoFK_fkey" FOREIGN KEY ("UsuarioUnoFK") REFERENCES "Usuario"("IdUsuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_UsuarioDosFK_fkey" FOREIGN KEY ("UsuarioDosFK") REFERENCES "Usuario"("IdUsuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_MatchFK_fkey" FOREIGN KEY ("MatchFK") REFERENCES "Match"("IdMatch") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensaje" ADD CONSTRAINT "Mensaje_ChatFK_fkey" FOREIGN KEY ("ChatFK") REFERENCES "Chat"("IdChat") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensaje" ADD CONSTRAINT "Mensaje_UsuarioFK_fkey" FOREIGN KEY ("UsuarioFK") REFERENCES "Usuario"("IdUsuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CondicionComunicacion" ADD CONSTRAINT "CondicionComunicacion_UsuarioFK_fkey" FOREIGN KEY ("UsuarioFK") REFERENCES "Usuario"("IdUsuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstadoActividad" ADD CONSTRAINT "EstadoActividad_UsuarioFK_fkey" FOREIGN KEY ("UsuarioFK") REFERENCES "Usuario"("IdUsuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donacion" ADD CONSTRAINT "Donacion_UsuarioDonanteFK_fkey" FOREIGN KEY ("UsuarioDonanteFK") REFERENCES "Usuario"("IdUsuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donacion" ADD CONSTRAINT "Donacion_UsuarioReceptorFK_fkey" FOREIGN KEY ("UsuarioReceptorFK") REFERENCES "Usuario"("IdUsuario") ON DELETE CASCADE ON UPDATE CASCADE;
