import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { Hardware } from '../../entities/Hardware.entity';
import { CreateHardwareInvoiceDto } from '../../dto/CreateHardwareDto';
import { Counter } from 'src/features/shared/counter.entity';
import { HardwareCounter } from 'src/features/shared/hardwareId.entity';

@ApiTags('Hardware')
@Controller('hardware')
export class HardwareController {
  constructor(
    @InjectModel(Hardware.name)
    private readonly invoiceRepo: Model<Hardware>,
    @InjectModel(HardwareCounter.name)
    private readonly counterModel: Model<HardwareCounter>,
  ) {}

  @Post('/add-hardware')
  @ApiResponse({ status: 201, description: 'Invoice created successfully' })
  async createInvoice(@Body() dto: CreateHardwareInvoiceDto) {
    const counter = await this.counterModel.findOneAndUpdate(
      { name: 'invoiceNo' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );

    dto.invoiceNo = counter.seq;

    dto.totalAmount = 0;
    dto.grandTotal = 0;

    for (let i = 0; i < dto.products.length; i++) {
      dto.products[i].amount = dto.products[i].quantity * dto.products[i].rate;

      dto.totalAmount += dto.products[i].amount;
      dto.grandTotal += Number(dto.previousAmount) + dto.totalAmount;
    }

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
