import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type InvoiceDocument = Invoice & Document;

@Schema()
export class Hardware {
  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  rate: number;

  @Prop({ required: true })
  amount: number;
}

const ProductSchema = SchemaFactory.createForClass(Hardware);

@Schema({ timestamps: true })
export class Invoice {
  @Prop()
  invoiceId: number;

  @Prop({ required: true, default: 'azib' })
  customerName: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true, default: 'multan' })
  city: string;

  @Prop({ type: [ProductSchema], default: [] })
  products: Hardware[];

  @Prop()
  totalAmount: number;

  @Prop()
  previousAmount: number;

  @Prop()
  grandTotal: number;
}

export const HardwareSchema = SchemaFactory.createForClass(Invoice);
