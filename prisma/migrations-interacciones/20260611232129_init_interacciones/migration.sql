-- CreateEnum
CREATE TYPE "TipoInteraccion" AS ENUM ('LIKE', 'NO_LIKE', 'EVITAR', 'REPORTAR', 'SUPERLIKE');

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

-- CreateIndex
CREATE INDEX "Interaccion_UsuarioOrigenFK_idx" ON "Interaccion"("UsuarioOrigenFK");

-- CreateIndex
CREATE INDEX "Interaccion_UsuarioDestinoFK_idx" ON "Interaccion"("UsuarioDestinoFK");

-- CreateIndex
CREATE UNIQUE INDEX "Interaccion_UsuarioOrigenFK_UsuarioDestinoFK_tipo_key" ON "Interaccion"("UsuarioOrigenFK", "UsuarioDestinoFK", "tipo");

-- CreateIndex
CREATE INDEX "Match_UsuarioUnoFK_idx" ON "Match"("UsuarioUnoFK");

-- CreateIndex
CREATE INDEX "Match_UsuarioDosFK_idx" ON "Match"("UsuarioDosFK");

-- CreateIndex
CREATE UNIQUE INDEX "Match_UsuarioUnoFK_UsuarioDosFK_key" ON "Match"("UsuarioUnoFK", "UsuarioDosFK");

-- CreateIndex
CREATE UNIQUE INDEX "Chat_MatchFK_key" ON "Chat"("MatchFK");

-- CreateIndex
CREATE INDEX "Chat_UsuarioUnoFK_idx" ON "Chat"("UsuarioUnoFK");

-- CreateIndex
CREATE INDEX "Chat_UsuarioDosFK_idx" ON "Chat"("UsuarioDosFK");

-- CreateIndex
CREATE UNIQUE INDEX "Chat_UsuarioUnoFK_UsuarioDosFK_key" ON "Chat"("UsuarioUnoFK", "UsuarioDosFK");

-- CreateIndex
CREATE INDEX "Mensaje_ChatFK_idx" ON "Mensaje"("ChatFK");

-- CreateIndex
CREATE INDEX "Mensaje_UsuarioFK_idx" ON "Mensaje"("UsuarioFK");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_MatchFK_fkey" FOREIGN KEY ("MatchFK") REFERENCES "Match"("IdMatch") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensaje" ADD CONSTRAINT "Mensaje_ChatFK_fkey" FOREIGN KEY ("ChatFK") REFERENCES "Chat"("IdChat") ON DELETE CASCADE ON UPDATE CASCADE;
