// counters.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'counter' })
export class HardwareCounter extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  seq: number;
}

export const HardwareCounterSchema =
  SchemaFactory.createForClass(HardwareCounter);
