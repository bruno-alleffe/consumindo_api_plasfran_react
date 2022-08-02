import * as veiculosReq from '../services/veiculosReq.js'
import Modal from 'react-modal'
import { useState } from 'react'
import { Trash } from 'heroicons-react'
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
      height: '320px',
      paddingTop: '1px',
      position: 'fixed',
      zIndex: '9999'
    },
    overlay: {zIndex: 1000}
  };

Modal.setAppElement('#root')

function ModalDeletar({atualizarTabela, id}) {

    async function remove() {
 
      const response = await veiculosReq.removeVeiculo(id)
      if(response.success){
        atualizarTabela()
        setIsOpen(false)
        toast.success('Veiculo excluido com sucesso', {
          position: toast.POSITION.TOP_CENTER
        })
      } else {
        setIsOpen(false)
        toast.error(`Erro: ${response.data}`, {
          position: toast.POSITION.TOP_CENTER
        })
      }
      
      
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
           
            <button onClick={openModal} className="group relative w-32 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Trash className='h-5 w-5 text-white-500 group-hover:text-white-400'></Trash>  
              Remover
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
                <div className="text-center flex flex-col -mt-10">
                    <svg className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Tem certeza de que deseja excluir esse Posto de combustível?</h3>
                </div>
                <div className='flex items-end justify-between'>
                  <button onClick={remove} data-modal-toggle="popup-modal" type="button" className="w-40 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                      Excluir
                  </button>
                  <button onClick={closeModal} data-modal-toggle="popup-modal" type="button" className="w-40 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">cancelar</button>
                </div>
            </Modal>
        </div>
    )
}

export default ModalDeletar