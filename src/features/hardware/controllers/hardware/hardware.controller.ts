import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { Hardware } from '../../entities/Hardware.entity';
import { CreateHardwareInvoiceDto } from '../../dto/CreateHardwareDto';

@ApiTags('Hardware')
@Controller('hardware')
export class HardwareController {
  constructor(
    @InjectModel(Hardware.name)
    private readonly invoiceRepo: Model<Hardware>,
  ) {}

  @Post('/add-hardware')
  @ApiResponse({ status: 201, description: 'Invoice created successfully' })
  async createInvoice(@Body() dto: CreateHardwareInvoiceDto) {
    dto.totalAmount = 0;
    dto.grandTotal = 0;
    for (let i = 0; i < dto.products.length; i++) {
      const data = (dto.products[i].amount =
        dto.products[i].quantity * dto.products[i].rate);

      dto.totalAmount += dto.products[i].amount;
      dto.grandTotal += Number(dto.previousAmount) + dto.totalAmount;
    }

    const invoice = await this.invoiceRepo.create(dto);

    return {
      message: 'Invoice saved!',
      data: invoice,
    };
  }

  @Get('/allInvoices')
  async getAllInvoice() {
    const invoice = await this.invoiceRepo.find();
    return invoice;
  }

  @Get('/find-by-id/:id')
  async getInvoice(@Param('id') id: string) {
    const invoice = await this.invoiceRepo.findById(id);
    if (!invoice) throw new NotFoundException('Invoice not found');
    return invoice;
  }
}
