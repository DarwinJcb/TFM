/* src/app.module.ts: */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsuariosModule } from './usuarios/usuario.module.js';
import { UbicacionesModule } from './ubicaciones/ubicacion.module.js';

@Module({
  imports: [PrismaModule, UsuariosModule, UbicacionesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
