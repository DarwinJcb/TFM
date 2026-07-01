/* src/matches/matches.module.ts: */
// import { PrismaModule } from '../prisma/prisma.module.js';
import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service.js';
import { MatchesController } from './matches.controller.js';
import { PrismaInteraccionesModule } from '../prisma/prisma-interacciones.module.js';

@Module({
  // imports: [PrismaModule],
  imports: [PrismaInteraccionesModule],
  controllers: [MatchesController],
  providers: [MatchesService],
})
export class MatchesModule { }