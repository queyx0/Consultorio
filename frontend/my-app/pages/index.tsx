import { useEffect, useState } from "react";
import { Select, OutlinedInput, MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { Paciente } from "../src/types/paciente";
import { Theme, useTheme } from "@mui/material/styles";
import { Chrono } from "react-chrono";

import obterTodosPacientes, {
  obterUmPaciente,
} from "../src/services/pacientes/obterTodos";
import { Consulta } from "../src/types/consulta";
import { Item } from "../src/types/item";
import moment from "moment";

function getStyles(theme: Theme) {
  return {
    fontWeight: theme.typography.fontWeightMedium,
  };
}

export default function Home() {
  const theme = useTheme();
  const [pacientes, setPacientes] = useState([]);
  const [idPacienteEscolhido, setIdPacienteEscolhido] = useState<string>();
  const [items, setItems] = useState<Item[]>([]);

  async function getPacientes() {
    const todos = await obterTodosPacientes();
    setPacientes(todos);
  }

  function onChange(event: SelectChangeEvent<typeof idPacienteEscolhido>) {
    if (event?.target?.value) {
      setItems([]);
      setIdPacienteEscolhido(event?.target?.value);
    }
  }

  async function getPacienteEscolhido(idPacienteEscolhido: any) {
    if (idPacienteEscolhido) {
      const pacienteEscolhido = await obterUmPaciente(idPacienteEscolhido);
      if (pacienteEscolhido) getItemsEscolhidos(pacienteEscolhido.consultas);
    }
  }

  function getItemsEscolhidos(consultas: Consulta[]) {
    moment.locale("pt-br");
    setItems([
      ...consultas?.map((consulta: Consulta) => {
        return {
          title: moment(consulta.data).format("DD/MM/YYYY"),
          cardTitle: "Consulta " + consulta.id,
          cardSubtitle: "Resumo: " + consulta.resumo,
          cardDetailedText: "Prescrição: " + consulta.prescricao,
        };
      }),
    ]);
  }

  useEffect(() => {
    getPacientes();
  }, []);

  useEffect(() => {
    getPacienteEscolhido(idPacienteEscolhido);
  }, [idPacienteEscolhido]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <>
      <div style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
        <Select
          value={idPacienteEscolhido}
          onChange={onChange}
          input={<OutlinedInput label="Paciente" />}
          placeholder="Selecione"
        >
          {pacientes?.map((paciente: Paciente) => (
            <MenuItem
              key={paciente.id}
              value={paciente.id}
              style={getStyles(theme)}
            >
              {paciente.nome}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div style={{ height: "85vh", backgroundColor: "#F4F4F4" }}>
        {items?.length && (
          <Chrono items={items} mode="VERTICAL_ALTERNATING" hideControls />
        )}
      </div>
      <div>Criado por Antonio Eduardo</div>
    </>
  );
}
