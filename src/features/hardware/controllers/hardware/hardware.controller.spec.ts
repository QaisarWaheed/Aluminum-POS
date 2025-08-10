import { Test, TestingModule } from '@nestjs/testing';
import { HardwareController } from './hardware.controller';

describe('AluminumController', () => {
  let controller: HardwareController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HardwareController],
    }).compile();

    controller = module.get<HardwareController>(HardwareController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
