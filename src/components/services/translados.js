import api, { createConfig } from "./api"

export async function getTranslados() {
    return api.get("/transladoTipo", createConfig())
}

export async function getTransladosID(id) {
  return api.get(`/transladoTipo/${id}`, createConfig())
}

export async function addTranslado(descricao, ativo) {
    return api.post(
      "/transladoTipo",
      { id: 0, descricao, ativo },
    );
  }
  
  export async function updateTranslado(id, descricao, ativo) {
    return api.post(
      `/transladoTipo`,
      { id, descricao, ativo },
    );
  }
  
  export async function removeTranslado(id) {
    return api.delete(`/transladoTipo/${id}`);
  }