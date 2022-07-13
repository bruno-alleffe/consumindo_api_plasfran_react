import * as veiculoMarca from '../services/veiculoMarca.js'
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
      width: '700px',
      height: '560px',
    },
    overlay: {zIndex: 1000}
  };

Modal.setAppElement('#root')

function ModalAdicionarEditar({atualizarTabela, id, tipo}) {
  const [marcaVeiculos, setMarcaVeiculos] = useState([])
  const [imagem, setImagem] = useState('')
  const [idImg, setIdImg] = useState('')


    async function adicionar(e) {
      e.preventDefault()
      console.log(e);
      
      const formData = new FormData();
      formData.append("arquivo", imagem);

      const response = await veiculoMarca.uploadLogo(formData)
      if(response.success){
        setIdImg(response.data.id)
        const response2 = await veiculoMarca.addVeiculoMarca(marcaVeiculos.descricao, response.data.id, marcaVeiculos.ativo)
        if(response2.success){
          setMarcaVeiculos([])
          atualizarTabela()
          setImagem('')
          setIsOpen(false)
          toast.success('Marca veículo adicionado com sucesso', {
            position: toast.POSITION.TOP_CENTER
          })
        } else {
          console.log(response2.data)
          setIsOpen(false)
          toast.error(`Erro: ${response2.data}`, {
            position: toast.POSITION.TOP_CENTER
          })
        }
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
      
      const formData = new FormData();
      formData.append("arquivo", imagem);
      
      const response = await veiculoMarca.uploadLogo(formData)
      if(response.success){
        setIdImg(response.data.id)

        const response2 = await veiculoMarca.updateVeiculoMarca(id, marcaVeiculos.descricao, response.data.id, marcaVeiculos.ativo)
        if(response2.success){
          atualizarTabela()
          setImagem('')
          setIsOpen(false)
          toast.success('Marca veículo atualizado com sucesso', {
            position: toast.POSITION.TOP_CENTER
          })
        } else {
          setIsOpen(false)
          toast.error(`Erro: ${response2.data}`, {
            position: toast.POSITION.TOP_CENTER
          })
        }
      } else {
        console.log(response.data)
        setIsOpen(false)
        toast.error(`Erro: ${response.data}`, {
          position: toast.POSITION.TOP_CENTER
        })
      }

      
    }

  
    function handleChange(e) {
      setMarcaVeiculos({ ...marcaVeiculos, [e.target.name]: e.target.value})
      console.log(marcaVeiculos)
    }
    function handleChangeCheckbox(e) {
      setMarcaVeiculos({ ...marcaVeiculos, [e.target.name]: e.target.checked})
      console.log(marcaVeiculos)
    }

    const handleChangeImagem = e => {
      setImagem(e.target.files[0])
      console.log(imagem);
    }

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
  
    function openModal() {
      if(tipo === "editar") {
        async function pegarTipoVeiculoId() {
          
          const response = await veiculoMarca.getVeiculoMarcaID(id)
          if(response.success){
            setMarcaVeiculos(response.data)
            console.log(response.data);
            setImagem(`https://beta-api.plasfran.com/api/Arquivo/download/${response.data.arquivoId}`)
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
                      <h3 className="block text-gray-700 text-lg font-semibold mb-2">Vaículo Marca<span className="font-bold">#Novo Cadastro</span></h3>
                      <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                              Marca:
                          </label>
                          <input value={marcaVeiculos.descricao} onChange={handleChange} type="text" name="descricao" id="descricao" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" aria-describedby="nomeHelp" placeholder="Descrição" required />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Foto da Marca:
                        </label>
                        <input files={imagem} onChange={e => setImagem(e.target.files[0])} name="arquivo" id="large_size" type="file" className="block w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"/>
                        {imagem ? <img src={typeof(imagem) === "object" ? URL.createObjectURL(imagem) : imagem} alt="Imagem" width="150px" height="150px" className="mt-3" /> : <img src="https://camo.githubusercontent.com/b7b7dca15c743879821e7cfc14e8034ecee3588e221de0a6f436423e304d95f5/68747470733a2f2f7a7562652e696f2f66696c65732f706f722d756d612d626f612d63617573612f33363664616462316461323032353338616531333332396261333464393030362d696d6167652e706e67" alt="Imagem" width="150px" height="150px" className="mt-3" />}
                      </div>
                      <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                              Ativo:
                          </label>
                          <input defaultChecked={marcaVeiculos.ativo} onChange={handleChangeCheckbox} type="checkbox" name="ativo" id="ativo" />
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