import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  rate: number;

  @ApiProperty()
  section: string;

  @ApiProperty()
  size: number;

  @ApiProperty()
  qty: number;

  @ApiProperty()
  gaje: number;

  @ApiProperty()
  color: string;

  @ApiProperty()
  discount: number;

  amount: number;
}

export class CreateInvoiceDto {
  @ApiProperty()
  customerName: string;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  city: string;

  @ApiProperty({ type: [ProductDto] })
  products: ProductDto[];

  @ApiProperty()
  discountedAmount: number;

  @ApiProperty()
  previousAmount: number;

  @ApiProperty()
  totalAmount: number;

  invoiceNo: number;
}
