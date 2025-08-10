import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HardwareModule } from './features/hardware/harware.module';
import { AluminumModule } from './features/aluminum/aluminum.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/hardware'),
    AluminumModule,
    HardwareModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
