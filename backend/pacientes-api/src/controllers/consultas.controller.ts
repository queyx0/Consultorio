import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Consulta } from 'src/models/consulta.module';
import { ConsultaService } from 'src/services/consultas.service';

@Controller('consultas')
export class ConsultasController {
  constructor(private consultasService: ConsultaService) {}

  @Get()
  async obterTodos(): Promise<Consulta[]> {
    return this.consultasService.obterTodos();
  }

  @Get(':id')
  async obterUm(@Param() params): Promise<Consulta> {
    return this.consultasService.obterUm(params.id);
  }

  @Post()
  async criar(@Body() paciente: Consulta) {
    this.consultasService.criar(paciente);
  }

  @Put()
  async alterar(@Body() consulta: Consulta): Promise<[number, Consulta[]]> {
    return this.consultasService.alterar(consulta);
  }

  @Delete(':id')
  async deletar(@Param() params) {
    return this.consultasService.apagar(params.id);
  }
}
