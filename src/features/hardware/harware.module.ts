import { Module } from '@nestjs/common';
import { AluminumController } from '../aluminum/controllers/aluminum/aluminum.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Hardware, HardwareSchema } from './entities/Hardware.entity';
import { HardwareController } from './controllers/hardware/hardware.controller';
import {
  HardwareCounter,
  HardwareCounterSchema,
} from '../shared/hardwareId.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hardware.name, schema: HardwareSchema },
      { name: HardwareCounter.name, schema: HardwareCounterSchema },
    ]),
  ],
  controllers: [HardwareController],
})
export class HardwareModule {}
