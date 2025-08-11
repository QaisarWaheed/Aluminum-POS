import { Module } from '@nestjs/common';
import { AluminumController } from './controllers/aluminum/aluminum.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Aluminum, AluminumSchema } from './entities/aluminum.entity';
import { Counter, CounterSchema } from '../shared/counter.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Aluminum.name, schema: AluminumSchema },
      { name: Counter.name, schema: CounterSchema },
    ]),
  ],
  controllers: [AluminumController],
})
export class AluminumModule {}
