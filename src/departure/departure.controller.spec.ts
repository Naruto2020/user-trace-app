import { Test, TestingModule } from '@nestjs/testing';
import { DepartureController } from './departure.controller';

describe('DepartureController', () => {
  let controller: DepartureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartureController],
    }).compile();

    controller = module.get<DepartureController>(DepartureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
