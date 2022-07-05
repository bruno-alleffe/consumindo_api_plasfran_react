import React from "react"
import DataTable from "react-data-table-component"
import * as translados from '../services/translados.js'
import { useState, useEffect } from 'react'
import ModalAdicionar from "./ModalAdicionar.js"
import ModalDeletar from "./ModalDeletar.js"
import ModalEditar from "./ModalEditar.js"

const TransladosTable = () => {
    const [search, setSearch] = useState("")
    const [translado, setTraslado] = useState([])
    const [filteredTranslado, setFilteredTranslado] = useState([])
    
    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
            width: "80px",
        },
        {
            name: "Tipo translado",
            selector: (row) => row.descricao,
            sortable: true,
            width: "650px",
        },
        {
            name: "Ativo",
            cell: (row) => <p>{row.ativo ? <input type="checkbox" checked /> : <input type="checkbox" />}</p>,
            width: "80px",
        },
        {
            name: "Ações",
            cell: (row) => <ModalEditar trans={translado} atualizarTabela={updateData} id={row.id} />,
            width: "140px",
                            
        },
        {
            name: "",
            cell: (row) => <ModalDeletar atualizarTabela={updateData} id={row.id} />,
            width: "140px",
                            
        },
    ]
       
    async function updateData() {
      try{
          const response = await translados.getTranslados()
          setTraslado(response.data)
          setFilteredTranslado(response.data)
      }
      catch(err){
          console.log(err);
      }
    }

    useEffect(() => {
        updateData()
    }, [])

    function clicou(e) {
        e.preventDefault()
        const el = e.target || e.srcElement
        const id = el.id
       console.log(id);
    }

    useEffect(() => {
        const result = translado.filter((transla) => {
            return transla.descricao.toLowerCase().match(search.toLowerCase())
        })

        setFilteredTranslado(result)
    }, [search])

    return <DataTable 
                title='Translados listagem' 
                columns={columns} 
                data={filteredTranslado} 
                pagination
                fixedHeader
                fixedHeaderScrollHeight="450PX"
                // selectableRows
                // selectableRowsHighlight
                // highlightOnHover
                actions={<ModalAdicionar atualizarTabela={updateData} />}
                subHeader
                subHeaderComponent={
                    <input  
                        type="text" 
                        className="appearance-none rounded-none relative block w-60 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                        placeholder="Pesquisar"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                }
                
            />
}

export default TransladosTable