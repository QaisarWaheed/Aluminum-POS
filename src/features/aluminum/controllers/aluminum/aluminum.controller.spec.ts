import { Test, TestingModule } from '@nestjs/testing';
import { AluminumController } from './aluminum.controller';

describe('AluminumController', () => {
  let controller: AluminumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AluminumController],
    }).compile();

    controller = module.get<AluminumController>(AluminumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
