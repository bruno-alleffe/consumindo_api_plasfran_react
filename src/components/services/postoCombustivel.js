import api, { createConfig } from "./api"

export async function getPostoCombustivel() {
  try{
    var response = await api.get("/veiculoPostoCombustivel", createConfig())
    return {
      success: true,
      data: response.data
    }
  }
  catch(err){
    return {
      success: false,
      data: err.response.data
    }
  }
}

export async function getPostoCombustivelId(id) {
  try{
    var response = await api.get(`/veiculoPostoCombustivel/${id}`, createConfig())
    return {
      success: true,
      data: response.data
    }
  }
  catch(err){
    return {
      success: false,
      data: err.response.data
    }
  }
}

export async function listarUf() {
  try{
    var response = await api.get("/UF", createConfig())
    return {
      success: true,
      data: response.data
    }
  }
  catch(err){
    return {
      success: false,
      data: err.response.data
      }
  }
}
export async function listarMunicipios(id) {
  try{
    var response = await api.get(`/municipio/UF/${id}`, createConfig())
    return {
      success: true,
      data: response.data
    }
  }
  catch(err){
    return {
      success: false,
      data: err.response.data
      }
  }
}
export async function listarBairros(id) {
  try{
    var response = await api.get(`/bairro/municipio/${id}`, createConfig())
    return {
      success: true,
      data: response.data
    }
  }
  catch(err){
    return {
      success: false,
      data: err.response.data
      }
  }
}

export async function listarRuas(id) {
  try{
    var response = await api.get(`/rua/bairro/${id}`, createConfig())
    return {
      success: true,
      data: response.data
    }
  }
  catch(err){
    return {
      success: false,
      data: err.response.data
      }
  }
}

export async function listarFornecedor() {
  try{
    var response = await api.get("/Fornecedor/Select2", createConfig())
    return {
      success: true,
      data: response.data
    }
  }
  catch(err){
    return {
      success: false,
      data: err.response.data
      }
  }
}

export async function buscarCep(cep) {
  try{
    var response = await api.get(`/CEP/CepVinculado/${cep}`, createConfig())
    return {
      success: true,
      data: response.data
    }
  }
  catch(err){
    return {
      success: false,
      data: err.response.data
      }
  }
}


export async function addPostoCombustivel(nomeFantasia, razaoSocial, cnpj, ativo, fornecedorVinculadoId, cep, ruaId, numero, pontoReferencia) {
  try{
    var response = await api.post(
      "/veiculoPostoCombustivel",
      { id: 0, nomeFantasia, razaoSocial, cnpj, ativo, fornecedorVinculadoId, cep, ruaId, numero, pontoReferencia},
    )
    return {
      success: true,
      data: response.data
    }
  }
  catch(err){
    return {
      success: false,
      data: err.response.data
    }
  }
}
  
export async function updatePostoCombustivel(id, nomeFantasia, razaoSocial, cnpj, ativo, fornecedorVinculadoId, cep, ruaId, numero, pontoReferencia) {
  try{
    var response = await api.post(
      `/veiculoPostoCombustivel`,
      { id, nomeFantasia, razaoSocial, cnpj, ativo, fornecedorVinculadoId, cep, ruaId, numero, pontoReferencia },
    )
    return {
      success: true,
      data: response.data
    }
  }
  catch(err){
    return {
      success: false,
      data: err.response.data
      }
  }
}
  
  export async function removePostoCombustivel(id) {
    try{
      var response = await api.delete(`/veiculoPostoCombustivel/${id}`);
      return {
        success: true,
        data: response.data
      }
    }
    catch(err){
      return {
        success: false,
        data: err.response.data
        }
    }
  }