// invoice.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { CreateInvoiceDto } from '../../dto/CreateAluminumBill.dto';
import { Aluminum } from '../../entities/aluminum.entity';
import { Counter } from 'src/features/shared/counter.entity';

@ApiTags('Aluminum')
@Controller('aluminum')
export class AluminumController {
  constructor(
    @InjectModel(Aluminum.name)
    private readonly invoiceRepo: Model<Aluminum>,
    @InjectModel(Counter.name) private readonly counterModel: Model<Counter>,
  ) {}

  @Post('add-aluminum-bill')
  @ApiResponse({ status: 201, description: 'Invoice created successfully' })
  async createInvoice(@Body() dto: CreateInvoiceDto) {
    if (!Array.isArray(dto.products)) {
      throw new BadRequestException('Products must be an array');
    }

    const counter = await this.counterModel.findOneAndUpdate(
      { name: 'invoiceNo' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );

    dto.invoiceNo = counter.seq;
    console.log(counter.seq);
    dto.discountedAmount = 0;
    dto.totalAmount = 0;

    for (const product of dto.products) {
      const amount = parseFloat(
        (
          product.size * product.quantity * product.rate +
          dto.hardwareAmount +
          dto.previousAmount
        ).toFixed(2),
      );
      const discountValue = Number((product.discount * amount) / 100);
      product.amount = Number(amount - discountValue);

      dto.totalAmount += amount;
      dto.discountedAmount += discountValue;
    }

    dto.totalAmount = Number(dto.totalAmount);
    dto.discountedAmount = Number(dto.discountedAmount);
    dto.grandTotal = dto.totalAmount - dto.receivedAmount;

    const invoice = await this.invoiceRepo.create(dto);
    return {
      message: 'Invoice saved!',
      data: invoice,
      invoiceNo: dto.invoiceNo,
    };
  }

  @Get('allInvoices')
  async getAllInvoice() {
    return this.invoiceRepo.find();
  }

  @Get('latest-invoice-no')
  async getLatestInvoiceNo() {
    const counter = await this.counterModel.findOne({ name: 'invoiceNo' });

    const latestInvoiceNo = counter ? counter.seq : 0;

    return { latestInvoiceNo };
  }

  @Get('/next-invoice-id')
  async getNextInvoiceId(): Promise<number> {
    // Just read the current counter, don't increment
    const counter = await this.counterModel.findOne({ name: 'invoiceNo' });
    return counter ? counter.seq + 1 : 1;
  }

  @Get('/find-invoice/:id')
  async getInvoice(@Param('id', ParseIntPipe) id: number) {
    const invoice = await this.invoiceRepo.findOne({ invoiceNo: id });
    if (!invoice) throw new NotFoundException('Invoice not found');
    return invoice;
  }
}
