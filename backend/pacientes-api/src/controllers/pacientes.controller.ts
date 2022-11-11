import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Paciente } from 'src/models/paciente.module';
import { PacientesService } from 'src/services/pacientes.service';

@Controller('pacientes')
export class PacientesController {
  constructor(private pacientesService: PacientesService) {}

  @Get()
  async obterTodos(): Promise<Paciente[]> {
    return this.pacientesService.obterTodos();
  }

  @Get(':id')
  async obterUm(@Param() params): Promise<Paciente> {
    return this.pacientesService.obterUm(params.id);
  }

  @Post()
  async criar(@Body() paciente: Paciente) {
    this.pacientesService.criar(paciente);
  }

  @Put()
  async alterar(@Body() paciente: Paciente): Promise<[number, Paciente[]]> {
    return this.pacientesService.alterar(paciente);
  }

  @Delete(':id')
  async deletar(@Param() params) {
    return this.pacientesService.apagar(params.id);
  }
}
