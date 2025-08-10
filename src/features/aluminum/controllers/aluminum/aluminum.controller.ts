// invoice.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { CreateInvoiceDto } from '../../dto/CreateAluminumBill.dto';
import { Aluminum } from '../../entities/aluminum.entity';

@ApiTags('Aluminum')
@Controller('aluminum')
export class AluminumController {
  constructor(
    @InjectModel(Aluminum.name)
    private readonly invoiceRepo: Model<Aluminum>,
  ) {}

  @Post('add-aluminum-bill')
  @ApiResponse({ status: 201, description: 'Invoice created successfully' })
  async createInvoice(@Body() dto: CreateInvoiceDto) {
    try {
      dto.discountedAmount = 0;
      let discountValue = 0;
      dto.totalAmount = 0;
      for (let i = 0; i < dto.products.length; i++) {
        const amount =
          dto.products[i].size *
          dto.products[i].quantity *
          dto.products[i].rate;

        discountValue = (dto.products[i].discount * amount) / 100;

        dto.products[i].amount = amount - discountValue;
        dto.totalAmount += amount;
        dto.discountedAmount += discountValue;
      }
      console.log(dto.discountedAmount);
      const invoice = await this.invoiceRepo.create({
        ...dto,
      });

      return {
        message: 'Invoice saved!',
        data: invoice,
      };
    } catch (e) {
      throw new BadRequestException('something went wrong', e);
    }
  }

  @Get('allInvoices')
  async getAllInvoice() {
    const invoice = await this.invoiceRepo.find();
    return invoice;
  }

  @Get('/find-inovoice/:id')
  async getInvoice(@Param('id') id: string) {
    const invoice = await this.invoiceRepo.findById({ id });
    if (!invoice) throw new NotFoundException('Invoice not found');
    return invoice;
  }
}
