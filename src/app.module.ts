import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HardwareModule } from './features/hardware/harware.module';
import { AluminumModule } from './features/aluminum/aluminum.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI', ''),
      }),
    }),

    AluminumModule,
    HardwareModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
