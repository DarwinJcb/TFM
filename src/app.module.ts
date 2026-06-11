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
import { InteraccionesModule } from './interacciones/interacciones.module';
import { MatchesModule } from './matches/matches.module';
import { ChatsModule } from './chats/chats.module';
import { MensajesModule } from './mensajes/mensajes.module';
import { CondicionesComunicacionModule } from './condiciones-comunicacion/condiciones-comunicacion.module';
import { EstadosActividadModule } from './estados-actividad/estados-actividad.module';

@Module({
  imports: [PrismaModule, UsuariosModule, UbicacionesModule, FotosModule, MusicasModule, PlanesSuscripcionModule, SuscripcionesModule, RestriccionesModule, InteraccionesModule, MatchesModule, ChatsModule, MensajesModule, CondicionesComunicacionModule, EstadosActividadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
