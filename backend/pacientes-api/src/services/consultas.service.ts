import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Consulta } from 'src/models/consulta.module';

@Injectable()
export class ConsultaService {
  constructor(
    @InjectModel(Consulta)
    private consultaModel: typeof Consulta,
  ) {}

  async obterTodos(): Promise<Consulta[]> {
    return this.consultaModel.findAll();
  }

  async obterUm(id: number): Promise<Consulta> {
    return this.consultaModel.findByPk(id);
  }

  async criar(consulta: Consulta) {
    this.consultaModel.create(consulta);
  }

  async alterar(consulta: Consulta): Promise<[number, Consulta[]]> {
    return this.consultaModel.update(consulta, {
      returning: true,
      where: {
        id: consulta.id,
      },
    });
  }

  async apagar(id: number) {
    const consulta: Consulta = await this.obterUm(id);
    consulta.destroy();
  }
}
