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
import { DonacionesModule } from './donaciones/donaciones.module';
import { PrismaUsuariosService } from './prisma/prisma-usuarios.service';
import { PrismaUsuariosModule } from './prisma/prisma-usuarios.module';
import { PrismaComercialService } from './prisma/prisma-comercial.service';
import { PrismaComercialModule } from './prisma/prisma-comercial.module';
import { PrismaInteraccionesModule } from './prisma/prisma-interacciones.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, UsuariosModule, UbicacionesModule, FotosModule, MusicasModule, PlanesSuscripcionModule, SuscripcionesModule, RestriccionesModule, InteraccionesModule, MatchesModule, ChatsModule, MensajesModule, CondicionesComunicacionModule, EstadosActividadModule, DonacionesModule, PrismaUsuariosModule, PrismaComercialModule, PrismaInteraccionesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaUsuariosService, PrismaComercialService],
})
export class AppModule { }
