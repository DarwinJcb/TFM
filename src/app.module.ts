/* src/app.module.ts: */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsuariosModule } from './usuarios/usuarios.module.js';
import { UbicacionesModule } from './ubicaciones/ubicaciones.module.js';
import { FotosModule } from './fotos/fotos.module';
import { MusicasModule } from './musicas/musicas.module';
import { PlanesSuscripcionModule } from './planes-suscripcion/planes-suscripcion.module';
import { SuscripcionesModule } from './suscripciones/suscripciones.module';
import { RestriccionesModule } from './restricciones/restricciones.module';

@Module({
  imports: [PrismaModule, UsuariosModule, UbicacionesModule, FotosModule, MusicasModule, PlanesSuscripcionModule, SuscripcionesModule, RestriccionesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
