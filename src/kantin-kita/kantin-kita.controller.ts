import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { KantinKitaService } from './kantin-kita.service';
import { kantinkitaDTO } from './kantin-kita.dto';
import { KantinKita } from './kantin-kita.entity';

@Controller('kantin-kita')
export class KantinKitaController {
  constructor(private readonly kantinKitaService: KantinKitaService) {}

  @Post()
  async create(@Body() kantinKitaDto: kantinkitaDTO): Promise<KantinKita> {
    return this.kantinKitaService.create(kantinKitaDto);
  }

  @Post('bulk')
  async createMany(
    @Body() kantinKitaDtos: kantinkitaDTO[],
  ): Promise<KantinKita[]> {
    return this.kantinKitaService.createMany(kantinKitaDtos);
  }

  @Get('list')
  async findAll(): Promise<KantinKita[]> {
    return this.kantinKitaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<KantinKita> {
    return this.kantinKitaService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() kantinKitaDto: kantinkitaDTO,
  ): Promise<KantinKita> {
    return this.kantinKitaService.update(id, kantinKitaDto);
  }
}
