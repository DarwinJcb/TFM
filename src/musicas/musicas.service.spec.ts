/* src/musicas/musicas.service.spec.ts: */
import { Test, TestingModule } from '@nestjs/testing';
import { MusicasService } from './musicas.service';

describe('MusicasService', () => {
  let service: MusicasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MusicasService],
    }).compile();

    service = module.get<MusicasService>(MusicasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
