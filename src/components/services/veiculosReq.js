import api, { createConfig } from "./api"

export async function getVeiculos() {
  try{
    var response = await api.get("/Veiculo", createConfig())
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

export async function getVeiculoId(id) {
  try{
    var response = await api.get(`/Veiculo/${id}`, createConfig())
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

export async function listarTipoMotor() {
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
export async function listarTipoMotorId(id) {
  try{
    var response = await api.get(`/VeiculoTipoMotor/${id}`, createConfig())
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

export async function listarMarcas() {
  try{
    var response = await api.get("/VeiculoMarca", createConfig())
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
export async function listarModelos(id) {
  try{
    var response = await api.get(`/VeiculoModelo/Marca/${id}`, createConfig())
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
export async function listarTiposVeiculos() {
  try{
    var response = await api.get('/VeiculoTipo', createConfig())
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


export async function addVeiculo(AnoFabricacao, AnoModelo, CapacidadeTanque, Chassi, KmInicial, KmLitro, KmLitroTolerancia, MunicipioId, Potencia, QtdPassageiro, QtdPorta, Renavam, Situacao, VeiculoMarcaId, VeiculoModeloId, VeiculoTipoId, VeiculoTipoMotorId, arquivo, ativo, placa) {
  try{
    var response = await api.post(
      "/Veiculo",
      {AnoFabricacao, AnoModelo, CapacidadeTanque, Chassi, KmInicial, KmLitro, KmLitroTolerancia, MunicipioId, Potencia, QtdPassageiro, QtdPorta, Renavam, Situacao, VeiculoMarcaId, VeiculoModeloId, VeiculoTipoId, VeiculoTipoMotorId, arquivo, ativo, id: 0, placa},
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
  
export async function updateVeiculo(AnoFabricacao, AnoModelo, CapacidadeTanque, Chassi, KmInicial, KmLitro, KmLitroTolerancia, MunicipioId, Potencia, QtdPassageiro, QtdPorta, Renavam, Situacao, VeiculoMarcaId, VeiculoModeloId, VeiculoTipoId, VeiculoTipoMotorId, arquivo, ativo, id, placa) {
  try{
    var response = await api.post(
      `/Veiculo`,
      { AnoFabricacao, AnoModelo, CapacidadeTanque, Chassi, KmInicial, KmLitro, KmLitroTolerancia, MunicipioId, Potencia, QtdPassageiro, QtdPorta, Renavam, Situacao, VeiculoMarcaId, VeiculoModeloId, VeiculoTipoId, VeiculoTipoMotorId, arquivo, ativo, id, placa },
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
  
  export async function removeVeiculo(id) {
    try{
      var response = await api.delete(`/Veiculo/${id}`);
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