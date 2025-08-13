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

  @Prop({ required: true })
  gaje?: number;

  @Prop({ required: true })
  color?: string;

  @Prop({ required: true })
  rate: number;

  @Prop({ required: true })
  discount: number;

  @Prop()
  amount: number;
}

const ProductSchema = SchemaFactory.createForClass(Aluminum);

@Schema({ timestamps: true })
export class Invoice {
  @Prop()
  invoiceNo: number;

  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  companyName: string;

  @Prop()
  declare date: Date;

  @Prop({ required: true, default: 'Multan' })
  city: string;

  @Prop({ type: [ProductSchema], default: [] })
  products: Aluminum[];

  @Prop({})
  discountedAmount: number;

  @Prop({})
  totalAmount: number;

  @Prop()
  previousAmount: number;

  @Prop()
  receivedAmount: number;

  @Prop()
  grandTotal: number;

  @Prop()
  hardwareAmount: number;
}

export const AluminumSchema = SchemaFactory.createForClass(Invoice);
