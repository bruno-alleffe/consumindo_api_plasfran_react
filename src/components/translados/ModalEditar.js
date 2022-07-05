import * as translados from '../services/translados.js'
import Modal from 'react-modal'
import { useState, useEffect } from 'react'
import { Pencil } from 'heroicons-react'

const customStyles = {
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '700px',
    height: '330px',
    },
    overlay: {zIndex: 1000}
  };

Modal.setAppElement('#root')

function ModalEditar({atualizarTabela, id}) {
  const [translado, setTraslado] = useState([])

  
  async function pegaTransladoID() {
    try{
        const response = await translados.getTransladosID(id)
        setTraslado(response.data)
    }
    catch(err){
        console.log(err);
    }
  }

  useEffect(() => {
    pegaTransladoID(id)
  }, [])
  

  async function atualizar(e) {
    e.preventDefault()
    try{
        const response = await translados.updateTranslado(id, translado.descricao, translado.ativo)
        console.log(response.data);
        atualizarTabela()
        setIsOpen(false)
    }
    catch(err){
        console.log(err);
    }
  }

  function handleChange(e) {
    setTraslado({ ...translado, [e.target.name]: e.target.value})
    console.log(translado)
  }
  function handleChangeCheckbox(e) {
    setTraslado({ ...translado, [e.target.name]: e.target.checked})
    console.log(translado)
  }

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
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
           
            <button onClick={openModal} className="group relative w-32 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Pencil className='h-5 w-5 text-white-500 group-hover:text-white-400'></Pencil>  
              Editar
           </button>
            
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
                  <form className="mt-2 space-y-3" onSubmit={atualizar}>
                      <h3 className="block text-gray-700 text-lg font-semibold mb-2">Tipo Translado<span className="font-bold">#Editar</span></h3>
                      <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                              Descrição:
                          </label>
                          <input value={translado.descricao} onChange={handleChange} type="text" name="descricao" id="descricao" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" aria-describedby="nomeHelp" placeholder="Descrição" required />
                      </div>
                      <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                              Ativo:
                          </label>
                          <input checked={translado.ativo} onChange={handleChangeCheckbox} type="checkbox" name="ativo" id="ativo" />
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

export default ModalEditar