/* src/restricciones/restricciones.controller.spec.ts: */
import { Test, TestingModule } from '@nestjs/testing';
import { RestriccionesController } from './restricciones.controller';
import { RestriccionesService } from './restricciones.service';

describe('RestriccionesController', () => {
  let controller: RestriccionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestriccionesController],
      providers: [RestriccionesService],
    }).compile();

    controller = module.get<RestriccionesController>(RestriccionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
