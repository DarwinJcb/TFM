/* src/usuarios/usuario.service.spec.ts: */
import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from './usuario.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('UsuariosService', () => {
  let service: UsuariosService;

  const prismaMock = {
    usuario: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
