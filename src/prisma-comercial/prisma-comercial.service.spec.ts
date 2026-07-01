/* src/prisma-comercial/prisma-comercial.service.spec.ts: */
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaComercialService } from './prisma-comercial.service';

describe('PrismaComercialService', () => {
  let service: PrismaComercialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaComercialService],
    }).compile();

    service = module.get<PrismaComercialService>(PrismaComercialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
