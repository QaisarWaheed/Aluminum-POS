import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InvoiceDocument = Invoice & Document;

@Schema()
export class Aluminum {
  @Prop({ required: true })
  section: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: false })
  gaje: number;

  @Prop({ required: false })
  color: string;

  @Prop({ required: true })
  rate: number;

  @Prop()
  discount: number;

  @Prop({ required: true })
  amount: number;
}

const ProductSchema = SchemaFactory.createForClass(Aluminum);

@Schema({ timestamps: true })
export class Invoice {
  @Prop()
  invoiceNo: number;

  @Prop({ required: false })
  customerName: string;

  @Prop({ required: false })
  companyName: string;

  @Prop({ required: false })
  declare date: Date;

  @Prop({ default: 'Multan' })
  city: string;

  @Prop({ type: [ProductSchema], default: [] })
  products: Aluminum[];

  @Prop({ required: false })
  discountedAmount: number;

  @Prop({ required: false })
  totalAmount: number;

  @Prop({ required: false })
  previousAmount: number;

  @Prop({ required: false })
  receivedAmount: number;

  @Prop()
  grandTotal: number;

  @Prop({ required: false })
  hardwareAmount: number;
}

export const AluminumSchema = SchemaFactory.createForClass(Invoice);
