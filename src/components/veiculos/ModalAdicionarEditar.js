import * as postoCombustivel from '../services/postoCombustivel.js'
import * as veiculosReq from '../services/veiculosReq.js'
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
      width: '1250px',
      height: '640px',
    },
    overlay: {zIndex: 1000}
  };

Modal.setAppElement('#root')

function ModalAdicionarEditar({atualizarTabela, id2, tipo}) {
  const [veiculos, setVeiculos] = useState([])

  const [marcas, setMarcas] = useState([])
  const [selectedMarca, setSelectedMarca] = useState(null)

  const [modelos, setModelos] = useState([])
  const [selectedModelo, setSelectedModelo] = useState(null)

  const [tiposVeiculos, setTiposVeiculos] = useState([])
  const [selectedTipoVeiculo, setSelectedTipoVeiculo] = useState(null)

  const [tiposMotores, setTiposMotores] = useState([])
  const [selectedTipoMotor, setSelectedTipoMotor] = useState(null)


    async function adicionar(e) {
      e.preventDefault()
      console.log(e);

      const response = await veiculosReq.addVeiculo(veiculos.anoFabricacao, veiculos.anoModelo, veiculos.capacidadeTanque, veiculos.chassi, veiculos.kmInicial, veiculos.kmLitro, veiculos.kmLitroTolerancia, 3, veiculos.potencia, veiculos.qtdPassageiro, veiculos.qtdPorta, veiculos.renavam, veiculos.situacao, selectedMarca.value, selectedModelo.value, selectedTipoVeiculo.value, selectedTipoMotor.value, null, veiculos.ativo, veiculos.placa)
      if(response.success){
        
        atualizarTabela()
        setIsOpen(false)
        
        toast.success('Veiculo adicionado com sucesso', {
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

      const response = await veiculosReq.updateVeiculo(veiculos.anoFabricacao, veiculos.anoModelo, veiculos.capacidadeTanque, veiculos.chassi, veiculos.kmInicial, veiculos.kmLitro, veiculos.kmLitroTolerancia, 3, veiculos.potencia, veiculos.qtdPassageiro, veiculos.qtdPorta, veiculos.renavam, veiculos.situacao, selectedMarca.value, selectedModelo.value, selectedTipoVeiculo.value, selectedTipoMotor.value, null, veiculos.ativo, id2, veiculos.placa)
      if(response.success){
        atualizarTabela()
        setIsOpen(false)
        toast.success('Veiculo atualizado com sucesso', {
          position: toast.POSITION.TOP_CENTER
        })
      } else {
        setIsOpen(false)
        toast.error(`Erro: ${response.data}`, {
          position: toast.POSITION.TOP_CENTER
        })
      }
     
    }

    async function pegarTipoMotor() {
      const response = await veiculosReq.listarTipoMotor()
      if(response.success) {
        console.log(response.data)
        var tiposMotores = response.data.map(function(tipoMotor, i) {
          return {
            value: tipoMotor.id,
            label: tipoMotor.descricao
          }
        })
        setTiposMotores(tiposMotores)
      } else {
        console.log(response.data)
      }
    }
    async function pegarMarcas() {
      const response = await veiculosReq.listarMarcas()
      if(response.success) {
        console.log(response.data)
        var marcas = response.data.map(function(marca, i) {
          return {
            value: marca.id,
            label: marca.descricao
          }
        })
        setMarcas(marcas)
      } else {
        console.log(response.data)
      }
    }
    async function pegarModelos(MarcaId) {
      const response = await veiculosReq.listarModelos(MarcaId)
      if(response.success) {
        console.log(response.data)
        var modelos = response.data.map(function(modelo, i) {
          return {
            value: modelo.id,
            label: modelo.descricao
          }
        })
        setModelos(modelos)
      } else {
        console.log(response.data)
      }
    }
    async function pegarTiposVeiculos() {
      const response = await veiculosReq.listarTiposVeiculos()
      if(response.success) {
        console.log(response.data)
        var tiposVeiculos = response.data.map(function(tipoVeiculo, i) {
          return {
            value: tipoVeiculo.id,
            label: tipoVeiculo.descricao
          }
        })
        setTiposVeiculos(tiposVeiculos)
      } else {
        console.log(response.data)
      }
    }


    useEffect(() => {
      pegarTipoMotor()
      pegarMarcas()
      pegarTiposVeiculos()
    }, [])

  
    function handleChange(e) {
      setVeiculos({ ...veiculos, [e.target.name]: e.target.value})
      console.log(veiculos)
    }
    
    function handleChangeCheckbox(e) {
      setVeiculos({ ...veiculos, [e.target.name]: e.target.checked})
      console.log(veiculos)
    }
    
    const handleChangeSelectMarca = e => {
      setSelectedMarca(e)
      setSelectedModelo([])
      console.log(selectedMarca);
      pegarModelos(e.value)
    }

    const handleChangeSelectModelo = e => {
      setSelectedModelo(e)
      console.log(selectedModelo);
    }

    const handleChangeSelectTipoVeiculo = e => {
      setSelectedTipoVeiculo(e)
      console.log(selectedTipoVeiculo);
    }

    const handleChangeSelectTipoMotor = e => {
      setSelectedTipoMotor(e)
      console.log(selectedTipoMotor);
    }

    function setSituacao(e) {
      console.log(e.target.name)
      setVeiculos({ ...veiculos, situacao: e.target.name})
      console.log(veiculos)
    }
    
    function validarPlaca(entradaDoUsuario) {
      var placa = entradaDoUsuario.value; // Passa para a variável 'placa' o que o usuário digitar no formulário
      var placaMaiuscula
      if (placa.length === 1 || placa.length === 2) {                       // Quando a string possuir 1 ou 2 dígitos
              placaMaiuscula = placa.toUpperCase();                      // Passa a string para letras maiúsculas
              document.forms[0].placa.value = placaMaiuscula;    // Coloca a string modificada de volta no formulário
              return true;
      }

      if (placa.length === 3){                                                        // Quando a string possuir 3 dígitos
              placa += "-";                                                                 // Adiciona um hífen
              placaMaiuscula = placa.toUpperCase();                   // Passa a string para letras maiúsculas
              document.forms[0].placa.value = placaMaiuscula; // Coloca a nova string de volta no formulário
              return true;
      }
    }

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
  
    function openModal() {
      if(tipo === "editar") {
        async function pegarVeiculosId() {
          const response = await veiculosReq.getVeiculoId(id2)
          if(response.success){
            setVeiculos(response.data)
            console.log(response.data)

            const marca = {
              value: response.data.veiculoMarca.id, 
              label: response.data.veiculoMarca.descricao
            }
            setSelectedMarca(marca)

            const modelo = {
              value: response.data.veiculoModelo.id, 
              label: response.data.veiculoModelo.descricao
            }
            setSelectedModelo(modelo)

            const tipo = {
              value: response.data.veiculoTipo.id, 
              label: response.data.veiculoTipo.descricao
            }
            setSelectedTipoVeiculo(tipo)

            const response2 = await veiculosReq.listarTipoMotorId(response.data.veiculoTipoMotorId)
            if(response2.success){
              console.log(response2.data)
              const tipoMotor = {
                value: response2.data.id, 
                label: response2.data.descricao
              }
              setSelectedTipoMotor(tipoMotor)
            } else {
              console.log(response2.data)
            }

          } else {
            // setIsOpen(false)
            toast.error(`Erro: ${response.data}`, {
              position: toast.POSITION.TOP_CENTER
            })
          }
        }        
        pegarVeiculosId()
        
        
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

    /* Máscaras ER */
    function mascara(o,f){
      var v_obj=o
      var v_fun=f
      setTimeout(execmascara(v_obj, v_fun),1)
    }
    function execmascara(v_obj, v_fun){
        v_obj.value=v_fun(v_obj.value)
    }
    function mplaca(v){
        
        v=v.replace(/(\d)(\d{5})$/,"$1-$2");
        // v=v.toUpperCase();
        return v;
    }
    function mcnpj(v){
      v=v.replace(/\D/g,""); //Remove tudo o que não é dígito
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
        id('placa').onkeyup = function(){
            mascara( this, mplaca );
        }
        id('posto-cnpj').onkeyup = function(){
          mascara( this, mcnpj );
      }
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
                      <h3 className="block text-gray-700 text-lg font-semibold mb-2">Veiculos<span className="font-bold">{tipo === "editar" ? `#${id2}` : "#Novo Cadastro"}</span></h3>

                      <h3 className="block text-gray-700 text-lg text-zinc-400 font-semibold mb-2 border-b-2 pb-2">Dados do Veículo</h3>

                      <div className='flex'>
                        <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                              Marca:
                          </label>
                          <Select 
                            placeholder="Selecione"
                            options={marcas}
                            value={selectedMarca}
                            onChange={handleChangeSelectMarca}
                            required
                            className='w-72'
                          />
                        </div>
                         <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2 mx-4">
                              Modelo:
                          </label>
                          <Select 
                            placeholder="Selecione"
                            options={modelos}
                            value={selectedModelo}
                            onChange={handleChangeSelectModelo}
                            required
                            className='w-72 mx-4'
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2 mx-4">
                              Tipo do Veículo:
                          </label>
                          <Select 
                            placeholder="Selecione"
                            options={tiposVeiculos}
                            value={selectedTipoVeiculo}
                            onChange={handleChangeSelectTipoVeiculo}
                            required
                            className='w-72'
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2 mx-4">
                              Origem:
                          </label>
                          <Select 
                            placeholder="Selecione"
                            options={[]}
                            value={[]}
                            onChange={handleChangeSelectMarca}
                            required
                            className='w-72 mx-4'
                            isDisabled
                          />
                        </div>
                      </div>

                      <h3 className="block text-gray-700 text-lg text-zinc-400 font-semibold mb-2 border-b-2 pb-2 pt-4">Dados do Documentais</h3>
                      <div className='flex'>{/* Inicio Div Flex */}
                        <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                              Placa:
                          </label>
                          <input value={veiculos.placa} onChange={handleChange} onKeyDown={executaMascara} type="text" maxLength="8" name="placa" id="placa" className="w-52 appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" aria-describedby="nomeHelp" placeholder="___-____" required />
                        </div>
                         <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2 mx-4" htmlFor="username">
                              Chassi:
                          </label>
                          <input value={veiculos.chassi} onChange={handleChange} type="text" maxLength="17" name="chassi" id="chassi" className="w-64 mx-4 appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" aria-describedby="nomeHelp" placeholder="Chassi" required />
                        </div>
                         <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                              Renavam:
                          </label>
                          <input value={veiculos.renavam} onChange={handleChange} type="text" maxLength="11" name="renavam" id="renavam" className="w-64 appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" aria-describedby="nomeHelp" placeholder="Renavam" required />
                        </div>
                         <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2 mx-4" htmlFor="username">
                              Ano Fabricação:
                          </label>
                          <input value={veiculos.anoFabricacao} onChange={handleChange} type="text" maxLength="4" name="anoFabricacao" id="anoFabricacao" className="w-52 mx-4 ppearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" aria-describedby="nomeHelp" placeholder="Ano Fab" required />
                        </div>
                         <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                              Ano Modelo:
                          </label>
                          <input value={veiculos.anoModelo} onChange={handleChange} type="text" maxLength="4" name="anoModelo" id="anoModelo" className="w-52 appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" aria-describedby="nomeHelp" placeholder="Ano Mod" required />
                        </div>
                      </div>{/* Fim Div Flex */}

                      <h3 className="block text-gray-700 text-lg text-zinc-400 font-semibold mb-2 border-b-2 pb-2 pt-4">Dados do Motor</h3>
                      <div className='flex'>{/* Inicio Div Flex */}
                        <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                              Potência:
                          </label>
                          <input value={veiculos.potencia} onChange={handleChange} type="text" name="potencia" id="potencia" className="w-52 appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Potência" required />
                        </div>
                         <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2 mx-4" htmlFor="username">
                              Km Atual:
                          </label>
                          <input value={veiculos.kmInicial} onChange={handleChange} type="text" name="kmInicial" id="kmInicial" className="w-52 mx-4 appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Km Atual" required />
                        </div>
                         <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                              Km/L:
                          </label>
                          <input value={veiculos.kmLitro} onChange={handleChange} type="text" name="kmLitro" id="kmLitro" className="w-52 appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Km/L" required />
                        </div>
                         <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2 mx-4" htmlFor="username">
                              Tolerancia Km/L %:
                          </label>
                          <input value={veiculos.kmLitroTolerancia} onChange={handleChange} type="text" name="kmLitroTolerancia" id="kmLitroTolerancia" className="w-52 mx-4 ppearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Tolerancia Km/L %" required />
                        </div>
                         <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                              Porta:
                          </label>
                          <input value={veiculos.qtdPorta} onChange={handleChange} type="text" name="qtdPorta" id="qtdPorta" className="w-36 appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" aria-describedby="nomeHelp" placeholder="Qtd Portas" required />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2 mx-4" htmlFor="username">
                              Passageiros:
                          </label>
                          <input value={veiculos.qtdPassageiro} onChange={handleChange} type="text" name="qtdPassageiro" id="qtdPassageiro" className="w-36 mx-4 appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" aria-describedby="nomeHelp" placeholder="Qtd Passageiros" required />
                        </div>
                      </div>{/* Fim Div Flex */}

                      <div className='flex'>{/* Inicio Div Flex */}
                        <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                              Tipo de Motor:
                          </label>
                          <Select 
                            placeholder="Selecione"
                            options={tiposMotores}
                            value={selectedTipoMotor}
                            onChange={handleChangeSelectTipoMotor}
                            required
                            className='w-60'
                          />
                        </div>
                         <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2 mx-4" htmlFor="username">
                              Cap do Tanque(L):
                          </label>
                          <input value={veiculos.capacidadeTanque} onChange={handleChange} type="text" name="capacidadeTanque" id="capTanque" className="w-60 mx-4 appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Cap do Tanque(L)" required />
                        </div>
                         <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                              Situação:
                          </label>
                          <button onClick={setSituacao} type="button" name="disponivel" className="w-80 h-10 text-gray-500 bg-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-none border border-gray-400 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Disponível</button>
                          <button onClick={setSituacao} type="button" name="manutencao"  className="w-80 h-10 text-gray-500 bg-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-none border border-gray-400 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Manutenção</button>
                        </div>
                      </div>{/* Fim Div Flex */}
                     
                      <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                              Ativo:
                          </label>
                          <input  defaultChecked={true} Checked={veiculos.ativo} onChange={handleChangeCheckbox} type="checkbox" name="ativo" id="ativo" />
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