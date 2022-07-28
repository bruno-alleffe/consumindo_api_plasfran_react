import * as postoCombustivel from '../services/postoCombustivel.js'
import Modal from 'react-modal'
import { useState, useEffect } from 'react'
import Select from 'react-select'
import { Pencil } from 'heroicons-react'
import { toast } from 'react-toastify'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '820px',
      height: '640px',
    },
    overlay: {zIndex: 1000}
  };

Modal.setAppElement('#root')

function ModalAdicionarEditar({atualizarTabela, id2, tipo}) {
  const [postoCombistiveis, setPostoCombistiveis] = useState([])

  const [fornecedores, setFornecedores] = useState([])
  const [selectedFornecedor, setSelectedFornecedor] = useState(null)

  const [UFs, setUFs] = useState([])
  const [selectedUF, setSelectedUF] = useState(null)

  const [municipios, setMunicipios] = useState([])
  const [selectedMunicipio, setSelectedMunicipio] = useState(null)

  const [bairros, setBairros] = useState([])
  const [selectedBairro, setSelectedBairro] = useState(null)

  const [ruas, setRuas] = useState([])
  const [selectedRua, setSelectedRua] = useState(null)


    async function adicionar(e) {
      e.preventDefault()
      console.log(e);

      const response = await postoCombustivel.addPostoCombustivel(postoCombistiveis.nomeFantasia, postoCombistiveis.razaoSocial, postoCombistiveis.cnpj, postoCombistiveis.ativo, selectedFornecedor.value, postoCombistiveis.cep, selectedRua.value, postoCombistiveis.numero, postoCombistiveis.pontoReferencia)
      if(response.success){
        setPostoCombistiveis([])
        atualizarTabela()
        setIsOpen(false)
        setSelectedUF(null)
        setSelectedMunicipio(null)
        setSelectedBairro(null)
        setSelectedRua(null)
        setSelectedFornecedor(null)
        setPostoCombistiveis([])
        toast.success('Posto de combustível adicionado com sucesso', {
          position: toast.POSITION.TOP_CENTER
        })
      } else {
        console.log(response.data)
        setIsOpen(false)
        toast.error(`Erro: ${response.data}`, {
          position: toast.POSITION.TOP_CENTER
        })
      }
    }

    
    async function atualizar(e) {
      e.preventDefault()

      const response = await postoCombustivel.updatePostoCombustivel(id2, postoCombistiveis.nomeFantasia, postoCombistiveis.razaoSocial, postoCombistiveis.cnpj, postoCombistiveis.ativo, selectedFornecedor.value, postoCombistiveis.cep, selectedRua.value, postoCombistiveis.numero, postoCombistiveis.pontoReferencia)
      if(response.success){
        atualizarTabela()
        setIsOpen(false)
        setSelectedUF(null)
        setSelectedMunicipio(null)
        setSelectedBairro(null)
        setSelectedRua(null)
        setSelectedFornecedor(null)
        setPostoCombistiveis([])
        toast.success('Posto de comnustível atualizado com sucesso', {
          position: toast.POSITION.TOP_CENTER
        })
      } else {
        setIsOpen(false)
        toast.error(`Erro: ${response.data}`, {
          position: toast.POSITION.TOP_CENTER
        })
      }
     
    }

    async function pegarUFs() {
      const response = await postoCombustivel.listarUf()
      if(response.success) {
        // console.log(response.data)
        var UFs = response.data.map(function(uf, i) {
          return {
            value: uf.id,
            label: uf.descricao
          }
        })
        setUFs(UFs)
      } else {
        console.log(response.data)
      }
    }



    async function pegarFornecedores() {
      const response = await postoCombustivel.listarFornecedor()
      if(response.success) {
        // console.log(response.data)
        var Fornecedores = response.data.results.map(function(fornecedor, i) {
          return {
            value: fornecedor.id,
            label: fornecedor.text
          }
        })
        setFornecedores(Fornecedores)
      } else {
        console.log(response.data)
      }
    }

    useEffect(() => {
      pegarUFs()
      pegarFornecedores()
    }, [])

    async function pegarCeps(cep) {
      // var cep2 = cep.replace(/[^0-9]/g, '')

      const response = await postoCombustivel.buscarCep(cep)
      if(response.success) {
        console.log(response.data)
        setPostoCombistiveis({ ...postoCombistiveis, bairro: response.data.bairro.descricao, rua: response.data.rua === null ? 'nenhum' : response.data.rua.descricao, ruaId: response.data.rua === null ? null : response.data.rua.id, municipio: response.data.municipio.descricao})
        // console.log(postoCombistiveis);
        const UF = {
          value: response.data.uf.id,
          label: response.data.uf.descricao
        }
        setSelectedUF(UF)

        const municipio = {
          value: response.data.municipio.id,
          label: response.data.municipio.descricao
        }
        setSelectedMunicipio(municipio)

        const bairro = {
          value: response.data.bairro.id,
          label: response.data.bairro.descricao
        }
        setSelectedBairro(bairro)

        const rua = {
          value: response.data.rua.id,
          label: response.data.rua.descricao
        }
        setSelectedRua(rua)

        const response2 = await postoCombustivel.listarMunicipios(response.data.uf.id)
        if(response2.success) {
          console.log(response2.data)
          var municipios = response2.data.map(function(municipio, i) {
            return {
              value: municipio.id,
              label: municipio.descricao
            }
          })
          setMunicipios(municipios)
        } else {
          console.log(response2.data)
        }

        const response3 = await postoCombustivel.listarBairros(response.data.municipio.id)
        if(response3.success) {
          console.log(response3.data)
          var bairros = response3.data.map(function(bairros, i) {
            return {
              value: bairros.id,
              label: bairros.descricao
            }
          })
          setBairros(bairros)
        } else {
          console.log(response3.data)
        }

        const response4 = await postoCombustivel.listarRuas(response.data.bairro.id)
        if(response4.success) {
          console.log(response4.data)
          var ruas = response4.data.map(function(rua, i) {
            return {
              value: rua.id,
              label: rua.descricao
            }
          })
          setRuas(ruas)
        } else {
          console.log(response4.data)
        }


      } else {
        console.log(response.data)
      }
        
      
      
    }
  
    function handleChange(e) {
      setPostoCombistiveis({ ...postoCombistiveis, [e.target.name]: e.target.value})
      console.log(postoCombistiveis)
    }


    function buscarCEPClick() {
      if(postoCombistiveis.cep != null && postoCombistiveis.cep.length === 9) {
        pegarCeps(postoCombistiveis.cep)
      }
    }
   
    
    function handleChangeCheckbox(e) {
      setPostoCombistiveis({ ...postoCombistiveis, [e.target.name]: e.target.checked})
      console.log(postoCombistiveis)
    }
    
    /* Máscaras ER */
    function mascara(o,f){
      var v_obj=o
      var v_fun=f
      setTimeout(execmascara(v_obj, v_fun),1)
    }
    function execmascara(v_obj, v_fun){
        v_obj.value=v_fun(v_obj.value)
    }
    function mcep(v){
        v=v.replace(/\D/g,""); //Remove tudo o que não é dígito
        v=v.replace(/^(\d{5})(\d)/,"$1-$2")
        return v;
    }
    function mcnpj(v){
      v=v.replace(/\D/g,"");
      //Coloca ponto entre o segundo e o terceiro dígitos
      v=v.replace(/^(\d{2})(\d)/,"$1.$2")
      //Coloca ponto entre o quinto e o sexto dígitos
      v=v.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")
      //Coloca uma barra entre o oitavo e o nono dígitos
      v=v.replace(/\.(\d{3})(\d)/,".$1/$2")
      //Coloca um hífen depois do bloco de quatro dígitos
      v=v.replace(/(\d{4})(\d)/,"$1-$2")
      return v;
    }
    function id( el ){
        return document.getElementById( el );
    }
    
    function executaMascara() {
        id('cep').onkeyup = function(){
            mascara( this, mcep );
        }
        id('posto-cnpj').onkeyup = function(){
          mascara( this, mcnpj );
      }
    }
    async function setarMunicipios(UfId){
      const response = await postoCombustivel.listarMunicipios(UfId)
        if(response.success) {
          console.log(response.data)
          var municipios = response.data.map(function(municipio, i) {
            return {
              value: municipio.id,
              label: municipio.descricao
            }
          })
          setMunicipios(municipios)
        } else {
          console.log(response.data);
        }
    }
    async function setarBairros(MunicioioId){
      const response = await postoCombustivel.listarBairros(MunicioioId)
        if(response.success) {
          console.log(response.data)
          var bairros = response.data.map(function(bairro, i) {
            return {
              value: bairro.id,
              label: bairro.descricao
            }
          })
          setBairros(bairros)
        } else {
          console.log(response.data);
        }
    }
    async function setarRuas(BairroId){
      const response = await postoCombustivel.listarRuas(BairroId)
        if(response.success) {
          console.log(response.data)
          var ruas = response.data.map(function(rua, i) {
            return {
              value: rua.id,
              label: rua.descricao
            }
          })
          setRuas(ruas)
        } else {
          console.log(response.data);
        }
    }

    const handleChangeSelectUF = e => {
      setSelectedUF(e)
      console.log(selectedUF);
      setPostoCombistiveis({ ...postoCombistiveis, cep: "",})
      setSelectedMunicipio(null)
      setSelectedBairro(null)
      setSelectedRua(null)
      const bairro = []
      setBairros(bairro)
      const rua = []
      setRuas(rua)
      setarMunicipios(e.value)
    }

    const handleChangeSelectMunicipio = e => {
      setSelectedMunicipio(e)
      console.log(selectedMunicipio);
      setSelectedBairro(null)
      setSelectedRua(null)
      setarBairros(e.value)
    }

    const handleChangeSelectBairro = e => {
      setSelectedBairro(e)
      console.log(selectedBairro);
      setSelectedRua(null)
      setarRuas(e.value)
    }

    const handleChangeSelectRua = e => {
      setSelectedRua(e)
      console.log(selectedRua);
    }
    
    const handleChangeSelectFornecedor = e => {
      setSelectedFornecedor(e)
      console.log(selectedFornecedor);
    }

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
  
    function openModal() {
      if(tipo === "editar") {
        async function pegarPostoCombustivelId() {
          const response = await postoCombustivel.getPostoCombustivelId(id2)
          if(response.success){
            console.log(response.data)
            setPostoCombistiveis({ ...postoCombistiveis, 
                                  nomeFantasia: response.data.nomeFantasia, 
                                  razaoSocial: response.data.razaoSocial, 
                                  cnpj: response.data.cnpj, 
                                  ativo: response.data.ativo,
                                  fornecedorVinculadoId: response.data.fornecedorVinculadoId === null ? '' : response.data.fornecedorVinculadoId,
                                  cep: response.data.cep === null ? '' : response.data.cep,
                                  ruaId: response.data.ruaId === null ? '' : response.data.ruaId,
                                  numero: response.data.numero === null ? '' : response.data.numero,
                                  pontoReferencia: response.data.pontoReferencia === null ? '' : response.data.pontoReferencia,
                                  municipio: response.data.rua === null ? '' : response.data.rua.bairro.municipio.descricao,
                                  bairro: response.data.rua === null ? '' : response.data.rua.bairro.descricao,
                                  rua: response.data.rua === null ? '' : response.data.rua.descricao,
                                })
            if(response.data.rua === null) {
              const UF = {
                value: null,
                label: "Nenhum"
              }
              setSelectedUF(UF)
            } else {
              const UF = {
                value: response.data.rua.bairro.municipio.uf.id,
                label: response.data.rua.bairro.municipio.uf.descricao
              }
              setSelectedUF(UF)
            }
            
            if(response.data.fornecedorVinculado === null) {
              const fornecedor = {
                value: null,
                label: "Nenhum"
              }
              setSelectedFornecedor(fornecedor)
            } else {
              const fornecedor = {
                value: response.data.fornecedorVinculado.id, 
                label: response.data.fornecedorVinculado.razaoSocial
              }
              setSelectedFornecedor(fornecedor)
            }

            if(response.data.rua === null) {
              const municipio = {
                value: null,
                label: "Nenhum"
              }
              setSelectedMunicipio(municipio)
            } else {
              const municipio = {
                value: response.data.rua.bairro.municipio.id, 
                label: response.data.rua.bairro.municipio.descricao
              }
              setSelectedMunicipio(municipio)
            }

            if(response.data.rua === null) {
              const bairro = {
                value: null,
                label: "Nenhum"
              }
              setSelectedBairro(bairro)
            } else {
              const bairro = {
                value: response.data.rua.bairro.id, 
                label: response.data.rua.bairro.descricao
              }
              setSelectedBairro(bairro)
            }

            if(response.data.rua === null) {
              const rua = {
                value: null,
                label: "Nenhum"
              }
              setSelectedRua(rua)
            } else {
              const rua = {
                value: response.data.rua.id, 
                label: response.data.rua.descricao
              }
              setSelectedRua(rua)
            }

            
            
          } else {
            // setIsOpen(false)
            toast.error(`Erro: ${response.data}`, {
              position: toast.POSITION.TOP_CENTER
            })
          }
        }        
        pegarPostoCombustivelId()

        async function pegarUFs() {
          const response = await postoCombustivel.listarUf()
          if(response.success) {
            var UFs = response.data.map(function(uf, i) {
              return {
                value: uf.id,
                label: uf.descricao
              }
            })
            setUFs(UFs)
          } else {
            console.log(response.data)
          }
        }
        pegarUFs()
        
    }
    setIsOpen(true)
  }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);
    }
    
    return (
        <div>
            {tipo === "adicionar" ?
              <button onClick={openModal} className="group relative w-32 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Adicionar
              </button>
            :
              <button onClick={openModal} className="group relative w-32 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Pencil className='h-5 w-5 text-white-500 group-hover:text-white-400'></Pencil>  
                Editar
              </button>
            }
            
            <Modal
            isOpen={modalIsOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            >
                <button onClick={closeModal} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                </button>
                <div className="">
                  <form className="mt-2 space-y-3"  onSubmit={tipo === "adicionar" ? adicionar : atualizar}>
                      <h3 className="block text-gray-700 text-lg font-semibold mb-2">Posto de Combustível<span className="font-bold">{tipo === "editar" ? `#${id2}` : "#Novo Cadastro"}</span></h3>
                      <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                              Nome Fantasia:
                          </label>
                          <input value={postoCombistiveis.nomeFantasia} onChange={handleChange} type="text" name="nomeFantasia" id="descricao" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" aria-describedby="nomeHelp" placeholder="Nome Fantasia" required />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Fornecedor Vinculado:
                        </label>
                        <Select 
                          placeholder="Selecione o Fornecedor"
                          name="fornecedor"
                          options={fornecedores}
                          value={selectedFornecedor}
                          onChange={handleChangeSelectFornecedor}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Razão Social:
                        </label>
                        <input value={postoCombistiveis.razaoSocial} onChange={handleChange} type="text" name="razaoSocial" id="descricao" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" aria-describedby="nomeHelp" placeholder="Razão Social" required />
                      </div>
                      <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                              C.N.P.J:
                          </label>
                          <input value={postoCombistiveis.cnpj} onChange={handleChange} onKeyDown={executaMascara} maxlength="18" type="text" name="cnpj" id="posto-cnpj" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" aria-describedby="nomeHelp" placeholder="C.N.P.J" required />
                      </div>
                      <div className='flex'>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                CEP:
                            </label>
                            <input value={postoCombistiveis.cep} onChange={handleChange} onKeyDown={executaMascara} maxLength="9" type="text" name="cep" id="cep" className="appearance-none rounded-none relative block w-30 h-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" aria-describedby="nomeHelp" placeholder="99-999.999" />
                        </div>
                        <div className=' flex items-end'>
                              <button onClick={buscarCEPClick} type="button" className="w-30 h-10 text-gray-500 bg-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-none border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Buscar</button>
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2 mx-4" htmlFor="username">
                              UF:
                          </label>
                          <Select 
                            placeholder="Selecione UF"
                            name="uf"
                            options={UFs}
                            value={selectedUF}
                            onChange={handleChangeSelectUF}
                            required
                            className='w-52 mx-4'
                          />
                        </div>
                          <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Municipio:
                            </label>
                            <Select 
                              placeholder="Selecione o Município"
                              name="municipio"
                              options={municipios}
                              value={selectedMunicipio}
                              onChange={handleChangeSelectMunicipio}
                              required
                              className='w-60'
                            />
                        </div>
                      </div>
                      <div className='flex'>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Bairro:
                            </label>
                            <Select 
                              placeholder="Selecione o Bairro"
                              name="bairro"
                              options={bairros}
                              value={selectedBairro}
                              onChange={handleChangeSelectBairro}
                              required
                              className='w-60'
                            />
                        </div>
                        <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Rua:
                        </label>
                        <Select 
                          placeholder="Selecione a rua"
                          name="rua"
                          options={ruas}
                          value={selectedRua}
                          onChange={handleChangeSelectRua}
                          required
                          className='w-96 mx-4'
                        />
                    </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Número:
                            </label>
                            <input value={postoCombistiveis.numero} onChange={handleChange} type="number" name="numero" id="descricao" className="appearance-none rounded-none relative block w-28 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" aria-describedby="nomeHelp" placeholder="Número" required />
                        </div>
                      </div>
                      <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                              Ponto Referência:
                          </label>
                          <input value={postoCombistiveis.pontoReferencia} onChange={handleChange} type="text" name="pontoReferencia" id="descricao" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" aria-describedby="nomeHelp" placeholder="Ponto Referência" required />
                      </div>
                      <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                              Ativo:
                          </label>
                          <input  defaultChecked={true} onChange={handleChangeCheckbox} type="checkbox" name="ativo" id="ativo" />
                      </div>
                      <div className='flex items-end justify-between'>
                        <button onClick={closeModal} data-modal-toggle="popup-modal" type="button" className="w-40 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                          Cancelar
                        </button>
                        
                        <button data-modal-toggle="popup-modal" type="submit" className="w-40 text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5">
                          Enviar
                        </button>
                      </div>
                    </form>
                  </div>
            </Modal>
        </div>
    )
}

export default ModalAdicionarEditar