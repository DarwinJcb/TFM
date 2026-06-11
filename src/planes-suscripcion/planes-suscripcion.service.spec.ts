/* src/planes-suscripcion/planes-suscripcion.service.spec.ts: */
import { Test, TestingModule } from '@nestjs/testing';
import { PlanesSuscripcionService } from './planes-suscripcion.service';

describe('PlanesSuscripcionService', () => {
  let service: PlanesSuscripcionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanesSuscripcionService],
    }).compile();

    service = module.get<PlanesSuscripcionService>(PlanesSuscripcionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
