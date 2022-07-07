import api, { createConfig } from "./api"

export async function getTipoVeiculo() {
  try{
    var response = await api.get("/veiculoTipo", createConfig())
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

export async function getTipoVeiculoID(id) {
  // return api.get(`/veiculoTipo/${id}`, createConfig())
  try{
    var response = await api.get(`/veiculoTipo/${id}`, createConfig())
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


export async function addTipoVeiculo(descricao, tipo, ativo) {
  try{
    var response = await api.post(
      "/veiculoTipo",
      { id: 0, descricao, tipo, ativo},
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
  
export async function updateTipoVeiculo(id, descricao, tipo, ativo) {
  try{
    var response = await api.post(
      `/veiculoTipo`,
      { id, descricao, tipo, ativo},
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
  
  export async function removeTipoVeiculo(id) {
    try{
      var response = await api.delete(`/veiculoTipo/${id}`);
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
    // return api.delete(`/VeiculoTipoMotor/${id}`);
  }