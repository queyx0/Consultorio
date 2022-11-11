import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';
import { Consulta } from './consulta.module';

@Table
export class Paciente extends Model<Paciente> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nome: string;

  @HasMany(() => Consulta)
  consultas: Consulta[];
}
