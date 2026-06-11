/* src/ubicaciones/ubicaciones.controller.spec.ts: */
import { Test, TestingModule } from '@nestjs/testing';
import { UbicacionesController } from './ubicaciones.controller.js';
import { UbicacionesService } from './ubicaciones.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('UbicacionesController', () => {
  let controller: UbicacionesController;

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
      controllers: [UbicacionesController],
      providers: [
        UbicacionesService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    controller = module.get<UbicacionesController>(UbicacionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});