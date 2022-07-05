import api, { createConfig } from "./api"

export async function getAbastecimento() {
    return api.get("/veiculoCombustivel", createConfig())
}

export async function getAbastecimentoID(id) {
  return api.get(`/veiculoCombustivel/${id}`, createConfig())
}

export async function addAbastecimento(descricao, ativo) {
    return api.post(
      "/veiculoCombustivel",
      { id: 0, descricao, ativo },
    );
  }
  
  export async function updateAbastecimento(id, descricao, ativo) {
    return api.post(
      `/veiculoCombustivel`,
      { id, descricao, ativo },
    );
  }
  
  export async function removeAbastecimento(id) {
    return api.delete(`/veiculoCombustivel/${id}`);
  }