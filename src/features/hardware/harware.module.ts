import { Module } from '@nestjs/common';
import { AluminumController } from '../aluminum/controllers/aluminum/aluminum.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Aluminum, AluminumSchema } from '../aluminum/entities/aluminum.entity';
import { Hardware, HardwareSchema } from './entities/Hardware.entity';
import { HardwareController } from './controllers/hardware/hardware.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hardware.name, schema: HardwareSchema },
    ]),
  ],
  controllers: [HardwareController],
})
export class HardwareModule {}
