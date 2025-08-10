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

  @ApiProperty()
  totalAmount: number;

  @ApiProperty()
  previousAmount: number;

  @ApiProperty()
  grandTotal: number;
}
