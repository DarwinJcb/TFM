/* src/prisma-usuarios/prisma-usuarios.service.spec.ts: */
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaUsuariosService } from './prisma-usuarios.service';

describe('PrismaUsuariosService', () => {
  let service: PrismaUsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaUsuariosService],
    }).compile();

    service = module.get<PrismaUsuariosService>(PrismaUsuariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
