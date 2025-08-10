import { Module } from '@nestjs/common';
import { AluminumController } from './controllers/aluminum/aluminum.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Aluminum, AluminumSchema } from './entities/aluminum.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Aluminum.name, schema: AluminumSchema },
    ]),
  ],
  controllers: [AluminumController],
})
export class AluminumModule {}
