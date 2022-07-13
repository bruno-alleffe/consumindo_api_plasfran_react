import React from "react"
import DataTable from "react-data-table-component"
import * as veiculoMarca from '../services/veiculoMarca.js'
import { useState, useEffect } from 'react'
import ModalAdicionarEditar from "./ModalAdicionarEditar.js"
import ModalDeletar from "./ModalDeletar.js"
import { toast } from 'react-toastify'

const VeiculoMarcaTable = () => {
    const [search, setSearch] = useState("")
    const [marcaVeiculos, setMarcaVeiculos] = useState([])
    const [filteredMarcaVeiculos, setFilteredMarcaVeiculos] = useState([])
    
    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
            width: "80px",
        },
        {
            name: "Marca",
            selector: (row) => row.descricao,
            sortable: true,
            width: "480px",
        },
        {
            name: "Foto da Marca",
            cell: (row) =>   <img src={`https://beta-api.plasfran.com/api/Arquivo/download/${row.arquivoId}`} alt="" srcset="" width="80px"/>,
            sortable: true,
            width: "170px",
        },
        {
            name: "Ativo",
            cell: (row) => <p>{row.ativo ? <input readOnly={true} type="checkbox" checked /> : <input type="checkbox" readOnly={true} />}</p>,
            width: "80px",
        },
        {
            name: "Ações",
            cell: (row) => <ModalAdicionarEditar atualizarTabela={updateData} id={row.id} tipo={"editar"}/>,
            width: "140px",
                            
        },
        {
            name: "",
            cell: (row) => <ModalDeletar atualizarTabela={updateData} id={row.id} />,
            width: "140px",
                            
        },
    ]
       
    async function updateData() {
        
        const response = await veiculoMarca.getVeiculoMarca()
        if(response.success){
            setMarcaVeiculos(response.data)
            setFilteredMarcaVeiculos(response.data)
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
        const result = marcaVeiculos.filter((aba) => {
            return aba.descricao.toLowerCase().match(search.toLowerCase())
        })

        setFilteredMarcaVeiculos(result)
    }, [search])
    

    return <DataTable 
                title='Marca Veículo' 
                columns={columns} 
                data={filteredMarcaVeiculos} 
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

export default VeiculoMarcaTable