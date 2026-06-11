/* src/musicas/musicas.controller.spec.ts: */
import { Test, TestingModule } from '@nestjs/testing';
import { MusicasController } from './musicas.controller';
import { MusicasService } from './musicas.service';

describe('MusicasController', () => {
  let controller: MusicasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicasController],
      providers: [MusicasService],
    }).compile();

    controller = module.get<MusicasController>(MusicasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
