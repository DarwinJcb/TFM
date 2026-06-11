/* src/restricciones/restricciones.service.spec.ts: */
import { Test, TestingModule } from '@nestjs/testing';
import { RestriccionesService } from './restricciones.service';

describe('RestriccionesService', () => {
  let service: RestriccionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestriccionesService],
    }).compile();

    service = module.get<RestriccionesService>(RestriccionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
