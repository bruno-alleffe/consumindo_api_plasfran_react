import api, { createConfig } from "./api"

export async function getAbastecimentos() {
  try{
    var response = await api.post("/VeiculoAbastecimento/listagem", 
    {
      DataFimAbastecimento: "2022-08-05T23:59:59-03:00",
      DataInicioAbastecimento: "2022-05-04T23:59:59-03:00",
      MotoristaId: null,
      VeiculoId: null
    }, createConfig())
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

export async function getAbastecimentosFiltra(dataInicio, dataFim, MotoristaId, VeiculoId) {
  var defaultDataInicio = "2022-05-07T23:59:59-03:00"
  var defaultDataFim = new Date().toISOString()
  console.log(defaultDataFim);
  try{
    var response = await api.post("/VeiculoAbastecimento/listagem", 
    {
      DataFimAbastecimento: dataFim == null ? defaultDataFim : dataFim,
      DataInicioAbastecimento: dataInicio == null ? defaultDataInicio : dataInicio,
      MotoristaId: MotoristaId == null ? null : MotoristaId,
      VeiculoId: VeiculoId == null ? null : VeiculoId
    }, createConfig())
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

export async function getAbastecimentoId(id) {
  try{
    var response = await api.get(`/VeiculoAbastecimento/${id}`, createConfig())
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

export async function getVeiculosId(id) {
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

export async function getMotoristas() {
  try{
    var response = await api.get("/Colaborador/motorista", createConfig())
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

export async function getMotoristasId(id) {
  try{
    var response = await api.get(`/Colaborador/${id}`, createConfig())
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

export async function getPostos() {
  try{
    var response = await api.get("/VeiculoPostoCombustivel", createConfig())
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

export async function getPostosId(id) {
  try{
    var response = await api.get(`/VeiculoPostoCombustivel/${id}`, createConfig())
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
export async function getEmpresas() {
  try{
    var response = await api.get("/Empresa/Select2", createConfig())
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
export async function getEmpresasId(id) {
  try{
    var response = await api.get(`/Empresa/${id}`, createConfig())
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

export async function getFormasPagamento() {
  try{
    var response = await api.get("/FormaPagamento/Select2", createConfig())
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

export async function getFormasPagamentoId(id) {
  try{
    var response = await api.get(`/FormaPagamento/${id}`, createConfig())
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
export async function getCombustiveis() {
  try{
    var response = await api.get("/VeiculoTipoMotorCombustivel", createConfig())
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

export async function getCombustiveisId(id) {
  try{
    var response = await api.get(`/VeiculoCombustivel/${id}`, createConfig())
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

export async function getVeiculoID(id) {
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

export async function getTipoMotorId(id) {
  try{
    var response = await api.get(`/VeiculoTipoMotorCombustivel/tipomotor/${id}`, createConfig())
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


export async function addAbastecimento(DataAbastecimento, KmAtual, MotoristaId, PostoCombustivelId, QtdLitros, Valor, VeiculoCombustivelId,  VeiculoId, dataVencimento, empresaId, formaPagamentoId) {
  try{
    var response = await api.post(
      "/VeiculoAbastecimento",
      {DataAbastecimento, KmAtual, MotoristaId, PostoCombustivelId, QtdLitros, Valor, VeiculoCombustivelId,  VeiculoId, dataVencimento, empresaId, formaPagamentoId, id: 0},
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
  
export async function updateAbastecimento(DataAbastecimento, KmAtual, MotoristaId, PostoCombustivelId, QtdLitros, Valor, VeiculoCombustivelId,  VeiculoId, dataVencimento, empresaId, formaPagamentoId, id) {
  try{
    var response = await api.post(
      `/VeiculoAbastecimento`,
      { DataAbastecimento, KmAtual, MotoristaId, PostoCombustivelId, QtdLitros, Valor, VeiculoCombustivelId,  VeiculoId, dataVencimento, empresaId, formaPagamentoId, id},
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
  
  export async function removeAbastecimetno(id) {
    try{
      var response = await api.delete(`/VeiculoAbastecimento/${id}`);
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