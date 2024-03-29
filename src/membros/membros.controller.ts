import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
  UseGuards,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { MembrosService } from './membros.service';
import { CreateMembroDto } from './dto/create-membro.dto';
import { UpdateMembroDto } from './dto/update-membro.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from '../guards/roles.guard';
import { Membro } from './entities/membro.entity';

@Controller('membro')
@ApiTags('membro')
export class MembrosController {
  constructor(private readonly membrosService: MembrosService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post()
  create(@Body() createMembroDto: CreateMembroDto) {
    return this.membrosService.create(createMembroDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(): Promise<Membro[]> {
    return await this.membrosService.findAll();
  }

  // must be UUID
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const membro = await this.membrosService.findOne(id);
    if (!membro) {
      throw new HttpException('Membro não encontrado', HttpStatus.NOT_FOUND);
    }
    return membro;
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMembroDto: UpdateMembroDto) {
    const membro = await this.membrosService.findOne(id);
    if (!membro) {
      throw new HttpException('Membro não encontrado', HttpStatus.NOT_FOUND);
    }
    return await this.membrosService.update(id, updateMembroDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const membro = await this.membrosService.findOne(id);
    if (!membro) {
      throw new HttpException('Membro não encontrado', HttpStatus.NOT_FOUND);
    }
    await this.membrosService.remove(id);
    return null;
  }
}
