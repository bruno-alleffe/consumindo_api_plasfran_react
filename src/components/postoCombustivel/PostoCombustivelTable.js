import React from "react"
import DataTable from "react-data-table-component"
import * as postoCombustivel from '../services/postoCombustivel.js'
import { useState, useEffect } from 'react'
import ModalAdicionarEditar from "./ModalAdicionarEditar.js"
import ModalDeletar from "./ModalDeletar.js"
import { toast } from 'react-toastify'

const PostoCombustivelTable = () => {
    const [search, setSearch] = useState("")
    const [postoCombistiveis, setPostoCombistiveis] = useState([])
    const [filteredPostoCombistiveis, setFilteredPostoCombistiveis] = useState([])
    
    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
            width: "80px",
            style: {
                fontSize: '12px',
            },
        },
        {
            name: "Nome Fantasia",
            selector: (row) => row.nomeFantasia,
            sortable: true,
            width: "300px",
            style: {
                fontSize: '12px',
            },
           
        },
        {
            name: "Razão Social",
            selector: (row) => row.razaoSocial,
            sortable: true,
            width: "300px",
            style: {
                fontSize: '12px',
            },
        },
        {
            name: "C.N.P.J",
            selector: (row) => row.cnpj,
            sortable: true,
            width: "170px",
            style: {
                fontSize: '12px',
            },
        },
        {
            name: "Ativo",
            cell: (row) => <p>{row.ativo ? <input readOnly={true} type="checkbox" checked /> : <input type="checkbox" readOnly={true} />}</p>,
            width: "80px",
            style: {
                fontSize: '12px',
            },
        },
        {
            name: "Ações",
            cell: (row) => <ModalAdicionarEditar atualizarTabela={updateData} id2={row.id} tipo={"editar"}/>,
            width: "140px",
            style: {
                fontSize: '12px',
            },
        },
        {
            name: "",
            cell: (row) => <ModalDeletar atualizarTabela={updateData} id={row.id} />,
            width: "140px",
            style: {
                fontSize: '12px',
            },
        },
    ]
       
    async function updateData() {
        
        const response = await postoCombustivel.getPostoCombustivel()
        if(response.success){
            setPostoCombistiveis(response.data)
            setFilteredPostoCombistiveis(response.data)
            console.log(response.data);
        } else {
            toast.error(`Erro: ${response.data}`, {
                position: toast.POSITION.TOP_CENTER
            })
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
        const result = postoCombistiveis.filter((aba) => {
            return aba.nomeFantasia.toLowerCase().match(search.toLowerCase())
        })

        setFilteredPostoCombistiveis(result)
    }, [search])
    

    return <DataTable 
                title='Posto de Combustível' 
                columns={columns} 
                data={filteredPostoCombistiveis}
                pagination
                fixedHeader
                fixedHeaderScrollHeight="450PX"
                actions={<ModalAdicionarEditar atualizarTabela={updateData} tipo={"adicionar"}/>}
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

export default PostoCombustivelTable