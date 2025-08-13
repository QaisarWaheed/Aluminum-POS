import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

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
  @IsOptional()
  customerName: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  @IsOptional()
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
