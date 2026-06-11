/* src/ubicaciones/ubicaciones.service.spec.ts: */
import { Test, TestingModule } from '@nestjs/testing';
import { UbicacionesService } from './ubicaciones.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('UbicacionesService', () => {
  let service: UbicacionesService;

  const prismaMock = {
    usuario: {
      findUnique: jest.fn(),
    },
    ubicacion: {
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
        UbicacionesService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<UbicacionesService>(UbicacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});