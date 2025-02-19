import { Test, TestingModule } from '@nestjs/testing';
import { KantinKitaController } from './kantin-kita.controller';

describe('KantinKitaController', () => {
  let controller: KantinKitaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KantinKitaController],
    }).compile();

    controller = module.get<KantinKitaController>(KantinKitaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
