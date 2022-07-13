import api, { createConfig } from "./api"

export async function getVeiculoMarca() {
  try{
    var response = await api.get("/veiculoMarca", createConfig())
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

export async function getVeiculoMarcaID(id) {
  // return api.get(`/veiculoTipo/${id}`, createConfig())
  try{
    var response = await api.get(`/veiculoMarca/${id}`, createConfig())
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


export async function addVeiculoMarca(descricao, arquivoId, ativo) {
  try{
    var response = await api.post(
      "/veiculoMarca",
      { id: 0, descricao, arquivoId, ativo},
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
  
export async function updateVeiculoMarca(id, descricao, arquivoId, ativo) {
  try{
    var response = await api.post(
      `/veiculoMarca`,
      { id, descricao, arquivoId, ativo },
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
  
  export async function removeMarcaVeiculo(id) {
    try{
      var response = await api.delete(`/veiculoMarca/${id}`);
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

  export async function uploadLogo(imagem) {
    try{
      var response = await api.post(
        `/Arquivo/Upload`,
        imagem,
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