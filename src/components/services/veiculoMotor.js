import api, { createConfig } from "./api"

export async function getVeiculosMotores() {
  try{
    var response = await api.get("/VeiculoTipoMotor", createConfig())
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

export async function getVeiculosMotoresID(id) {
  return api.get(`/VeiculoTipoMotor/${id}`, createConfig())
}

export async function getCombustiveis() {
  return api.get("/VeiculoCombustivel", createConfig())
}
export async function getCombustiveisMotorID(id) {
  return api.get(`/VeiculoTipoMotorCombustivel/tipomotor/${id}`, createConfig())
}

export async function addVeiculosMotores(descricao, ativo, combustiveis) {
  try{
    var response = await api.post(
      "/VeiculoTipoMotor/combustivel",
      { id: 0, descricao, ativo, combustiveis},
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
  
export async function updateVeiculosMotores(id, descricao, ativo, combustiveis) {
  try{
    var response = await api.post(
      `/VeiculoTipoMotor/combustivel`,
      { id, descricao, ativo, combustiveis},
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
  
  export async function removeVeiculosMotores(id) {
    try{
      var response = await api.delete(`/VeiculoTipoMotor/${id}`);
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