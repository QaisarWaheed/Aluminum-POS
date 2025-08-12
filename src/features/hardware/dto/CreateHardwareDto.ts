import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty()
  productName: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  rate: number;

  @ApiProperty()
  amount: number;
}

export class CreateHardwareInvoiceDto {
  @ApiProperty()
  customerName: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  city: string;

  @ApiProperty({ type: [ProductDto] })
  products: ProductDto[];

  totalAmount: number;

  @ApiProperty()
  previousAmount: number;

  grandTotal: number;

  @ApiProperty()
  receivedAmount: number;

  @ApiProperty()
  aluminumTotal: number;

  invoiceNo: number;
}
