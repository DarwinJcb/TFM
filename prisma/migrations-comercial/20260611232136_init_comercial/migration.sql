-- CreateEnum
CREATE TYPE "TipoSuscripcion" AS ENUM ('BRONCE', 'GOLD', 'PREMIUM', 'PLATINO');

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
CREATE UNIQUE INDEX "PlanSuscripcion_tipo_key" ON "PlanSuscripcion"("tipo");

-- CreateIndex
CREATE UNIQUE INDEX "Suscripcion_UsuarioFK_key" ON "Suscripcion"("UsuarioFK");

-- CreateIndex
CREATE INDEX "Suscripcion_PlanSuscripcionFK_idx" ON "Suscripcion"("PlanSuscripcionFK");

-- CreateIndex
CREATE INDEX "Restriccion_PlanSuscripcionFK_idx" ON "Restriccion"("PlanSuscripcionFK");

-- CreateIndex
CREATE INDEX "Donacion_UsuarioDonanteFK_idx" ON "Donacion"("UsuarioDonanteFK");

-- CreateIndex
CREATE INDEX "Donacion_UsuarioReceptorFK_idx" ON "Donacion"("UsuarioReceptorFK");

-- AddForeignKey
ALTER TABLE "Suscripcion" ADD CONSTRAINT "Suscripcion_PlanSuscripcionFK_fkey" FOREIGN KEY ("PlanSuscripcionFK") REFERENCES "PlanSuscripcion"("IdPlanSuscripcion") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restriccion" ADD CONSTRAINT "Restriccion_PlanSuscripcionFK_fkey" FOREIGN KEY ("PlanSuscripcionFK") REFERENCES "PlanSuscripcion"("IdPlanSuscripcion") ON DELETE CASCADE ON UPDATE CASCADE;
