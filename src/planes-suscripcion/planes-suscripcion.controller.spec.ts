/* src/planes-suscripcion/planes-suscripcion.controller.spec.ts: */
import { Test, TestingModule } from '@nestjs/testing';
import { PlanesSuscripcionController } from './planes-suscripcion.controller';
import { PlanesSuscripcionService } from './planes-suscripcion.service';

describe('PlanesSuscripcionController', () => {
  let controller: PlanesSuscripcionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanesSuscripcionController],
      providers: [PlanesSuscripcionService],
    }).compile();

    controller = module.get<PlanesSuscripcionController>(PlanesSuscripcionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
