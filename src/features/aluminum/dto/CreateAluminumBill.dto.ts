import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

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
  @IsOptional()
  customerName?: string;

  @ApiProperty()
  @IsOptional()
  companyName?: string;

  @ApiProperty()
  @IsOptional()
  date?: string;

  @ApiProperty()
  @IsOptional()
  city?: string;

  @ApiProperty({ type: [ProductDto] })
  products: ProductDto[];

  @ApiProperty()
  @IsOptional()
  discountedAmount?: number;

  @ApiProperty()
  @IsOptional()
  previousAmount?: number;

  @ApiProperty()
  @IsOptional()
  totalAmount?: number;

  @ApiProperty()
  @IsOptional()
  receivedAmount?: number;

  @ApiProperty()
  @IsOptional()
  hardwareAmount?: number;

  @ApiProperty()
  @IsOptional()
  grandTotal?: number;

  invoiceNo: number;
}
