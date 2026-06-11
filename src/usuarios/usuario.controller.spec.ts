/* src/usuarios/usuario.controller.spec.ts: */
import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from './usuario.controller.js';
import { UsuariosService } from './usuario.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('UsuariosController', () => {
  let controller: UsuariosController;

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
      controllers: [UsuariosController],
      providers: [
        UsuariosService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    controller = module.get<UsuariosController>(UsuariosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});