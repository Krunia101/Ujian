import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProdukService } from './produk.service';
import {
  CreateProdukArrayDto,
  UpdateProdukDto,
  findAllProduk,
} from './produk.dto';
import { JwtGuard } from '../auth/auth.guard';
import { Pagination } from 'src/utils/decorator/pagenation';
import { ResponseSuccess } from 'src/Interpace';

@UseGuards(JwtGuard)
@Controller('produk')
export class ProdukController {
  constructor(private produkService: ProdukService) {}

  @Post('create-bulk')
  async createBulk(@Body() payload: CreateProdukArrayDto) {
    return this.produkService.createBulk(payload);
  }

  @Get('list')
  async findAll(@Pagination() query: findAllProduk) {
    return this.produkService.findAll(query);
  }
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResponseSuccess> {
    return this.produkService.findOne(id);
  }

  @Put(':id')
  async updateProduk(
    @Param('id') id: number,
    @Body() payload: UpdateProdukDto,
  ): Promise<ResponseSuccess> {
    return this.produkService.updateProduk(id, payload);
  }

  @Delete(':id')
  async deleteProduk(@Param('id') id: number): Promise<ResponseSuccess> {
    return this.produkService.deleteProduk(id);
  }

  @Delete('delete-bulk/:produkIds')
  async deleteBulk(@Param('produkIds') produkIds: string): Promise<any> {
    return this.produkService.deleteBulk(produkIds);
  }
}
