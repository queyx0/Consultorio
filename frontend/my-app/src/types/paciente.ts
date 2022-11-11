import { Consulta } from "./consulta";

export type Paciente = {
  id: number;
  nome: string;
  consultas?: Consulta[];
};
