import api from "../api";

export default async function obterTodosPacientes() {
  try {
    const resp = await api.get("/pacientes");
    return resp.data;
  } catch (e: any) {
    console.log(e);
  }
}

export async function obterUmPaciente(id: any) {
  try {
    const resp = await api.get(`/pacientes/${id}`);
    return resp.data;
  } catch (e: any) {
    console.log(e);
  }
}
