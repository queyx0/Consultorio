import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Paciente } from 'src/models/paciente.module';
import { Consulta } from 'src/models/consulta.module';

@Injectable()
export class PacientesService {
  constructor(
    @InjectModel(Paciente)
    private pacienteModel: typeof Paciente,
  ) {}

  async obterTodos(): Promise<Paciente[]> {
    return this.pacienteModel.findAll();
  }

  async obterUm(id: number): Promise<Paciente> {
    return this.pacienteModel.findOne({
      where: {
        id,
      },
      include: [Consulta],
    });
  }

  async criar(paciente: Paciente) {
    this.pacienteModel.create(paciente);
  }

  async alterar(paciente: Paciente): Promise<[number, Paciente[]]> {
    return this.pacienteModel.update(paciente, {
      returning: true,
      where: {
        id: paciente.id,
      },
    });
  }

  async apagar(id: number) {
    const paciente: Paciente = await this.obterUm(id);
    paciente.destroy();
  }
}
