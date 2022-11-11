import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import { Paciente } from './paciente.module';

@Table
export class Consulta extends Model<Consulta> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: { max: 255 },
  })
  anamnese: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: { max: 255 },
  })
  evolucao: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: { max: 255 },
  })
  prescricao: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: { max: 255 },
  })
  resumo: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  data: Date;

  @ForeignKey(() => Paciente)
  @Column({ type: DataType.INTEGER, allowNull: false })
  pacienteId: number;

  @BelongsTo(() => Paciente)
  paciente: Paciente;
}
