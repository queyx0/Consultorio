import api from "../api";

export default async function obterTodasConsultas() {
  try {
    const resp = await api.get("/consultas");
    return resp.data;
  } catch (e: any) {
    console.log(e);
  }
}
