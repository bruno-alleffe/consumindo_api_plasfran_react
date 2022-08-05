import * as abastecimentoV2Req from '../services/abastecimentoV2Req.js'
import Modal from 'react-modal'
import { useState, useEffect } from 'react'
import Select from 'react-select'
import { Pencil } from 'heroicons-react'
import { toast } from 'react-toastify'
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import Moment from 'moment'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '800px',
      height: '640px',
    },
    overlay: {zIndex: 1000}
  };

Modal.setAppElement('#root')

function ModalAdicionarEditar({atualizarTabela, id2, tipo}) {

  const [abastecimento, setAbastecimento] = useState([])

  const [veiculos, setVeiculos] = useState([])
  const [selectedVeiculo, setSelectedVeiculo] = useState(null)

  const [motoristas, setMotoristas] = useState([])
  const [selectedMotorista, setSelectedMotorista] = useState(null)

  const [postos, setPostos] = useState([])
  const [selectedPosto, setSelectedPosto] = useState(null)

  const [empresas, setEmpresas] = useState([])
  const [selectedEmpresa, setSelectedEmpresa] = useState(null)

  const [formasPagamento, setFormasPagamento] = useState([])
  const [selectedFormaPagamento, setSelectedFormaPagamento] = useState(null)

  const [combustiveis, setCombustiveis] = useState([])
  const [selectedCombustivel, setSelectedCombustivel] = useState(null)
  
  function formataData(dataSemFormato) {
    var dataFormatada = Moment(dataSemFormato).format("YYYY-MM-DD")
    return dataFormatada
  }


    async function adicionar(e) {
      e.preventDefault()
      console.log(e);

      var DataAbastecimento = new Date(abastecimento.dataAbastecimento).toISOString()
      var DataVencimento = new Date(abastecimento.dataVencimento).toISOString()

      const response = await abastecimentoV2Req.addAbastecimento(DataAbastecimento, abastecimento.kmAtual, selectedMotorista.value, selectedPosto.value, abastecimento.qtdLitros, abastecimento.valor, selectedCombustivel.value, selectedVeiculo.value, DataVencimento, selectedEmpresa.value, selectedFormaPagamento.value)
      if(response.success){
        
        atualizarTabela()
        setIsOpen(false)
        
        toast.success('Abastecimento adicionado com sucesso', {
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

      var DataAbastecimento = new Date(abastecimento.dataAbastecimento).toISOString()

      const response = await abastecimentoV2Req.updateAbastecimento(DataAbastecimento, abastecimento.kmAtual, selectedMotorista.value, selectedPosto.value, abastecimento.qtdLitros, abastecimento.valor, selectedCombustivel.value, selectedVeiculo.value, null, selectedEmpresa.value, null, id2)
      if(response.success){
        atualizarTabela()
        setIsOpen(false)
        toast.success('Abasteciemnto atualizado com sucesso', {
          position: toast.POSITION.TOP_CENTER
        })
      } else {
        setIsOpen(false)
        toast.error(`Erro: ${response.data}`, {
          position: toast.POSITION.TOP_CENTER
        })
      }
     
    }

    async function pegarVeiculos() {
      const response = await abastecimentoV2Req.getVeiculos()
      if(response.success) {
        // console.log(response.data)
        var veiculos = response.data.map(function(veiculo, i) {
          return {
            value: veiculo.id,
            label: (
                    <div className="text-xs">
                      <h6 className='font-bold'>{veiculo.placa}</h6>
                      <div className='flex justify-start'>
                        
                        <div className="flex w-40 items-center">
                          <AiIcons.AiFillCar className="mr-1"/>
                          <h6>{veiculo.veiculoMarca.descricao}</h6>
                        </div>

                        <div className='flex w-60 items-center mx-4'>
                          <AiIcons.AiFillTag className="mr-1"/>
                          <h6>{veiculo.veiculoModelo.descricao}</h6>
                        </div>

                        <div className='flex items-center'>
                          <FaIcons.FaBus className="mr-1"/>
                          <h6>{veiculo.veiculoTipo.descricao}</h6>
                        </div>
                        
                        
                      </div>
                    </div> 
                    
                    ),
            veiculoTipoMotorId: veiculo.veiculoTipoMotorId
          }
        })
        setVeiculos(veiculos)
      } else {
        console.log(response.data)
      }
    }

    async function pegarMotoristas() {
      const response = await abastecimentoV2Req.getMotoristas()
      if(response.success) {
        // console.log(response.data)
        var motoristas = response.data.map(function(motorista, i) {
          return {
            value: motorista.id,
            label: motorista.nome
          }
        })
        setMotoristas(motoristas)
      } else {
        console.log(response.data)
      }
    }
    async function pegarPostos() {
      const response = await abastecimentoV2Req.getPostos()
      if(response.success) {
        // console.log(response.data)
        var postos = response.data.map(function(posto, i) {
          return {
            value: posto.id,
            label: posto.nomeFantasia
          }
        })
        setPostos(postos)
      } else {
        console.log(response.data)
      }
    }
    async function pegarEmpresas() {
      const response = await abastecimentoV2Req.getEmpresas()
      if(response.success) {
        // console.log(response.data)
        var empresas = response.data.results.map(function(empresa, i) {
          return {
            value: empresa.id,
            label: empresa.text
          }
        })
        setEmpresas(empresas)
      } else {
        console.log(response.data)
      }
    }
    async function pegarFormasPagamento() {
      const response = await abastecimentoV2Req.getFormasPagamento()
      if(response.success) {
        // console.log(response.data)
        var formasPagamento = response.data.map(function(formaPagamento, i) {
          return {
            value: formaPagamento.id,
            label: formaPagamento.descricao
          }
        })
        setFormasPagamento(formasPagamento)
      } else {
        console.log(response.data)
      }
    }

     async function pegarCombustiveis(veiculoTipoMotorId) {
      const response = await abastecimentoV2Req.getTipoMotorId(veiculoTipoMotorId)
      if(response.success) {
        console.log(response.data)
        var combustiveis = response.data.map(function(combustivel, i) {
          return {
            value: combustivel.veiculoCombustivel.id,
            label: combustivel.veiculoCombustivel.descricao
          }
        })
        setCombustiveis(combustiveis)
      } else {
        console.log(response.data)
      }
    }


    useEffect(() => {
      pegarVeiculos()
      pegarMotoristas()
      pegarPostos()
      pegarEmpresas()
      pegarFormasPagamento()
    }, [])

  
    function handleChange(e) {
      setAbastecimento({ ...abastecimento, [e.target.name]: e.target.value})
      console.log(abastecimento)
      
      // var data = new Date(e.target.value).toISOString()
      // console.log(data);
    }

    const handleChangeSelectVeiculo = e => {
      setSelectedVeiculo(e)
      console.log(selectedVeiculo);
      console.log(e.veiculoTipoMotorId);
      pegarCombustiveis(e.veiculoTipoMotorId)
    }


    const handleChangeSelectMotorista = e => {
      setSelectedMotorista(e)
      console.log(selectedMotorista);
    }

    const handleChangeSelectPosto = e => {
      setSelectedPosto(e)
      console.log(selectedPosto);
    }

    const handleChangeSelectEmpresa = e => {
      setSelectedEmpresa(e)
      console.log(selectedEmpresa);
    }

    const handleChangeSelectFormaPagamento = e => {
      setSelectedFormaPagamento(e)
      console.log(selectedFormaPagamento);
    }

    const handleChangeSelectCombustivel = e => {
      setSelectedCombustivel(e)
      console.log(selectedCombustivel);
    }

    const [modalIsOpen, setIsOpen] = useState(false);
  
    function openModal() {
      if(tipo === "editar") {
        async function pegarAbastecimentoId() {
          const response = await abastecimentoV2Req.getAbastecimentoId(id2)
          if(response.success){
            response.data.dataAbastecimento = formataData(response.data.dataAbastecimento)
            setAbastecimento(response.data)
            console.log(response.data)

            const response2 = await abastecimentoV2Req.getVeiculosId(response.data.veiculoId)
            if(response2.success){
              console.log(response2.data)
              
              const veiculo = {
                value: response2.data.id, 
                label: (
                        <div className="text-xs">
                          <h6 className='font-bold'>{response2.data.placa}</h6>
                          <div className='flex justify-start'>
                            
                            <div className="flex w-40 items-center">
                              <AiIcons.AiFillCar className="mr-1"/>
                              <h6>{response2.data.veiculoMarca.descricao}</h6>
                            </div>

                            <div className='flex w-60 items-center mx-4'>
                              <AiIcons.AiFillTag className="mr-1"/>
                              <h6>{response2.data.veiculoModelo.descricao}</h6>
                            </div>

                            <div className='flex items-center'>
                              <FaIcons.FaBus className="mr-1"/>
                              <h6>{response2.data.veiculoTipo.descricao}</h6>
                            </div>
                            
                          </div>
                         </div> 
                        )
              }
              setSelectedVeiculo(veiculo)
            } else {
              console.log(response2.data)
            }

            const response3 = await abastecimentoV2Req.getMotoristasId(response.data.motoristaId)
            if(response3.success){
              console.log(response3.data)
              const motorista = {
                value: response3.data.colaborador.id, 
                label: response3.data.colaborador.nome
              }
              setSelectedMotorista(motorista)
            } else {
              console.log(response3.data)
            }

            const response4 = await abastecimentoV2Req.getPostosId(response.data.postoCombustivelId)
            if(response4.success){
              console.log(response4.data)
              const posto = {
                value: response4.data.id, 
                label: response4.data.nomeFantasia
              }
              setSelectedPosto(posto)
            } else {
              console.log(response4.data)
            }

            const response5 = await abastecimentoV2Req.getEmpresasId(response.data.empresaId)
            if(response5.success){
              console.log(response5.data)
              const empresa = {
                value: response5.data.id, 
                label: response5.data.id+' - '+response5.data.nomeFantasia
              }
              setSelectedEmpresa(empresa)
            } else {
              console.log(response5.data)
            }

            const response6 = await abastecimentoV2Req.getFormasPagamentoId(response.data.pagamentoId)
            if(response6.success){
              console.log(response6.data)
              const pagamento = {
                value: response6.data.id, 
                label: response6.data.descricao
              }
              setSelectedFormaPagamento(pagamento)
            } else {
              console.log(response6.data)
            }

            const response7 = await abastecimentoV2Req.getCombustiveisId(response.data.veiculoCombustivelId)
            if(response7.success){
              console.log(response7.data)
              const combustivel = {
                value: response7.data.id, 
                label: response7.data.descricao
              }
              setSelectedCombustivel(combustivel)
            } else {
              console.log(response7.data)
            }

          } else {
            // setIsOpen(false)
            toast.error(`Erro: ${response.data}`, {
              position: toast.POSITION.TOP_CENTER
            })
          }
        }        
        pegarAbastecimentoId()
        
        
      }
      setIsOpen(true)
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
              <button onClick={openModal} className="group relative w-24 flex justify-center py-2 px-0 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
                      <h3 className="block text-gray-700 text-lg font-semibold mb-2">Veiculo Abastecimento<span className="font-bold">{tipo === "editar" ? `#Editar Cadastro` : "#Novo Cadastro"}</span></h3>
            
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Veiculo:
                        </label>
                        <Select 
                          placeholder="Selecione"
                          options={veiculos}
                          value={selectedVeiculo || ''}
                          onChange={handleChangeSelectVeiculo}
                          required
                          className='w-full'
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Motorista:
                        </label>
                        <Select 
                          placeholder="Selecione"
                          options={motoristas}
                          value={selectedMotorista || ''}
                          onChange={handleChangeSelectMotorista}
                          required
                          className='w-full'
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Posto:
                        </label>
                        <Select 
                          placeholder="Selecione"
                          options={postos}
                          value={selectedPosto || ''}
                          onChange={handleChangeSelectPosto}
                          required
                          className='w-full'
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Empresa:
                        </label>
                        <Select 
                          placeholder="Selecione"
                          options={empresas}
                          value={selectedEmpresa || ''}
                          onChange={handleChangeSelectEmpresa}
                          required
                          className='w-full'
                        />
                      </div>

                      <div className='flex'>{/* Inicio Div Flex */}
                        
                        <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                              Forma de Pagamento:
                          </label>
                          <Select 
                            placeholder="Selecione"
                            options={formasPagamento}
                            value={selectedFormaPagamento || ''}
                            onChange={handleChangeSelectFormaPagamento}
                            required
                            className='w-80'
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2 mx-4" htmlFor="username">
                              Data de vencimento:
                          </label>
                          <input value={abastecimento.dataVencimento || ''} onChange={handleChange} type="date" name="dataVencimento" id="dataVencimento" className="w-80 mx-4 appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" aria-describedby="nomeHelp"/>
                        </div>
                      
                      </div>{/* Fim Div Flex */}

                      <div className='flex'>{/* Inicio Div Flex */}
                        <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                              Km Atual:
                          </label>
                          <input value={abastecimento.kmAtual || ''} onChange={handleChange} type="number" name="kmAtual" id="kmAtual" className="w-52 appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Km Atual" required />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2 mx-4" htmlFor="username">
                              Qtd litros:
                          </label>
                          <input value={abastecimento.qtdLitros || ''} onChange={handleChange} type="number" name="qtdLitros" id="qtdLitros" className="w-52 mx-4 appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Qtd Litros" required />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                              Valor Total:
                          </label>
                          <input value={abastecimento.valor || ''} onChange={handleChange} type="number" name="valor" id="valorTotal" className="w-52 appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Km/L" required />
                        </div>
                      </div>{/* Fim Div Flex */}

                      <div className='flex'>{/* Inicio Div Flex */}
                        
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Combustível:
                        </label>
                        <Select 
                          placeholder="Selecione"
                          options={combustiveis}
                          value={selectedCombustivel || ''}
                          onChange={handleChangeSelectCombustivel}
                          required
                          className='w-80'
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2 mx-4" htmlFor="username">
                            Data Abastecimento:
                        </label>
                        <input value={abastecimento.dataAbastecimento || ''} onChange={handleChange} type="date" name="dataAbastecimento" id="dataAbastecimento" className="mb-4 w-80 mx-4 appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" aria-describedby="nomeHelp" placeholder="Chassi" required />
                      </div>
                    
                    </div>{/* Fim Div Flex */}

                 

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