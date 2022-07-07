import * as tipoVeiculo from '../services/tipoVeiculo.js'
import Modal from 'react-modal'
import { useState, useEffect } from 'react'
import Select from 'react-select'
import { Pencil } from 'heroicons-react'
import { toast } from 'react-toastify'

const customStyles = {
    content: {
      top: '40%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '700px',
      height: '400px',
    },
    overlay: {zIndex: 1000}
  };

Modal.setAppElement('#root')

function ModalAdicionarEditar({atualizarTabela, id, tipo}) {
  const [tipoVeiculos, setTipoVeiculos] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)
  const [multiselectOptions, setMultiselectOptions] = useState([])


    async function adicionar(e) {
      e.preventDefault()

      const response = await tipoVeiculo.addTipoVeiculo(tipoVeiculos.descricao, selectedOption.value, tipoVeiculos.ativo)
      if(response.success){
        setSelectedOption([])
        setTipoVeiculos([])
        atualizarTabela()
        setIsOpen(false)
        toast.success('Tipo veículo adicionado com sucesso', {
          position: toast.POSITION.TOP_CENTER
        })
      } else {
        console.log(response.data)
        setIsOpen(false)
        // toast.success(`Erro: ${response.data}`)
        toast.error(`Erro: ${response.data}`, {
          position: toast.POSITION.TOP_CENTER
        })
      }
          
    }

    async function atualizar(e) {
      e.preventDefault()
      // var selectOps = selectedOption.map(function(option, i) {
      //   return option.value
      // })
      console.log(selectedOption);
      const response = await tipoVeiculo.updateTipoVeiculo(id, tipoVeiculos.descricao, selectedOption.value, tipoVeiculos.ativo)
      if(response.success){
        // console.log(response.data)
        setSelectedOption([])
        atualizarTabela()
        setIsOpen(false)
        toast.success('Tipo veículo atualizado com sucesso', {
          position: toast.POSITION.TOP_CENTER
        })
      } else {
        setIsOpen(false)
        toast.error(`Erro: ${response.data}`, {
          position: toast.POSITION.TOP_CENTER
        })
      }
    }

  
    function handleChange(e) {
      setTipoVeiculos({ ...tipoVeiculos, [e.target.name]: e.target.value})
      console.log(tipoVeiculos)
    }
    function handleChangeCheckbox(e) {
      setTipoVeiculos({ ...tipoVeiculos, [e.target.name]: e.target.checked})
      console.log(tipoVeiculos)
    }

    const handleChangeSelect = e => {
      setSelectedOption(e)
      console.log(selectedOption);
    }

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
  
    function openModal() {
      if(tipo === "editar") {
        async function pegarTipoVeiculoId() {
          
          const response = await tipoVeiculo.getTipoVeiculoID(id)
          if(response.success){
            setTipoVeiculos(response.data)
            // console.log(response.data);
            // console.log(response.data.tipo);
            const data = {
                value: response.data.tipo,
                label: response.data.tipo
              }
            setSelectedOption(data)
            // console.log(selectedOption);
          } else {
            setIsOpen(false)
            toast.error(`Erro: ${response.data}`, {
              position: toast.POSITION.TOP_CENTER
            })
          }
        }        
        pegarTipoVeiculoId()
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
    const data = [
      {
        value: "CARRO",
        label: "Carro"
      },
      {
        value: "AMBUÂLNCIA",
        label: "Ambulância"
      },
      {
        value: "ÔNIBUS",
        label: "Ônibus"
      },
      {
        value: "CAMINHÃO",
        label: "Caminhão"
      },
      {
        value: "MOTO",
        label: "Moto"
      },
    ]
    
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
                      <h3 className="block text-gray-700 text-lg font-semibold mb-2">Tipo Veículo<span className="font-bold">#Novo Cadastro</span></h3>
                      <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                              Tipo Veículo:
                          </label>
                          <input value={tipoVeiculos.descricao} onChange={handleChange} type="text" name="descricao" id="descricao" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" aria-describedby="nomeHelp" placeholder="Descrição" required />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Tipo:
                        </label>
                        <Select 
                          placeholder="Seleciones os combustíveis"
                          name="combustiveis"
                          options={data}
                          value={selectedOption}
                          onChange={handleChangeSelect}
                          required
                        />
                     </div>
                      <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                              Ativo:
                          </label>
                          <input defaultChecked={tipoVeiculos.ativo} onChange={handleChangeCheckbox} type="checkbox" name="ativo" id="ativo" />
                      </div>
                      <div className='flex items-end justify-between -pt-5'>
                        <button onClick={closeModal} data-modal-toggle="popup-modal" type="button" className="w-40 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>

                        <button data-modal-toggle="popup-modal" type="submit" className="w-40 text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
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