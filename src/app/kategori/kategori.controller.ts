import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { KategoriService, UpdatedBy } from './kategori.service';
import {
  CreateKategoriDto,
  KategoriIdDto,
  UpdateKategoriDto,
  findAllKategori,
} from './kategori.dto';
import { JwtGuard } from '../auth/auth.guard';
import { Pagination } from 'src/utils/decorator/pagenation';
import { CreateBulkKategoriDto } from './bulk.dto';
import { InjectCreatedBy } from 'src/utils/decorator/inject-created_by.decorator';
import { InjectUpdatedByParam } from 'src/utils/decorator/inject-updated_by.decorator';
import { InjectBulkCreatedBy } from 'src/utils/decorator/inject-createdBulk_by.decorator';

@UseGuards(JwtGuard) //  implementasikan global guard pada semua endpont kategori memerlukan authentikasi saat request
@Controller('kategori')
export class KategoriController {
  constructor(private kategoriService: KategoriService) {}

  @Post('create')
  async create(@InjectCreatedBy() payload: CreateKategoriDto) {
    return this.kategoriService.create(payload);
  }

  @Get('list')
  async getAllCategory(@Pagination() query: findAllKategori) {
    //gunakan custom decorator yang pernah kita buat
    return this.kategoriService.getAllCategory(query);
  }

  @Delete('delete-all')
  @HttpCode(HttpStatus.OK)
  async deleteAll() {
    return this.kategoriService.deleteAllCategories();
  }

  @Post('/bulk-create')
  async createBulk(@InjectBulkCreatedBy() payload: CreateBulkKategoriDto) {
    return this.kategoriService.createBulk(payload);
  }
  @Get(':id')
  async getCategoryDetail(@Param() params: KategoriIdDto) {
    return this.kategoriService.getCategoryDetail(params.id);
  }
  @Put(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() payload: Partial<CreateKategoriDto>,
    @InjectUpdatedByParam() updatedBy: { id: number },
  ) {
    return this.kategoriService.updateCategory(id, payload, updatedBy);
  }
}
