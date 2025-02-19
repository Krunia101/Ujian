import { Test, TestingModule } from '@nestjs/testing';
import { KantinKitaService } from './kantin-kita.service';

describe('KantinKitaService', () => {
  let service: KantinKitaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KantinKitaService],
    }).compile();

    service = module.get<KantinKitaService>(KantinKitaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
