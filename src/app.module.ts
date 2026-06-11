/* src/app.module.ts: */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsuariosModule } from './usuarios/usuarios.module.js';
import { UbicacionesModule } from './ubicaciones/ubicaciones.module.js';
import { FotosModule } from './fotos/fotos.module';

@Module({
  imports: [PrismaModule, UsuariosModule, UbicacionesModule, FotosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
