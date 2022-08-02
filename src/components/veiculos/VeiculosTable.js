import React from "react"
import DataTable from "react-data-table-component"
import * as veiculosReq from '../services/veiculosReq.js'
import { useState, useEffect } from 'react'
import ModalAdicionarEditar from "./ModalAdicionarEditar.js"
import ModalDeletar from "./ModalDeletar.js"
import { toast } from 'react-toastify'

const VeiculosTable = () => {
    const [search, setSearch] = useState("")
    const [veiculos, setVeiculos] = useState([])
    const [filteredVeiculos, setFilteredVeiculos] = useState([])
    
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
            name: "Marca",
            selector: (row) => row.veiculoMarca.descricao,
            sortable: true,
            width: "170px",
            style: {
                fontSize: '12px',
            },
           
        },
        {
            name: "Modelo",
            selector: (row) => row.veiculoModelo.descricao,
            sortable: true,
            width: "300px",
            style: {
                fontSize: '12px',
            },
        },
        {
            name: "Placa",
            selector: (row) => row.placa,
            sortable: true,
            width: "150px",
            style: {
                fontSize: '12px',
            },
        },
        {
            name: "Situação",
            selector: (row) => row.situacao,
            sortable: true,
            width: "150px",
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
        
        const response = await veiculosReq.getVeiculos()
        if(response.success){
            setVeiculos(response.data)
            setFilteredVeiculos(response.data)
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
        const result = veiculos.filter((aba) => {
            return aba.veiculoMarca.descricao.toLowerCase().match(search.toLowerCase())
        })

        setFilteredVeiculos(result)
    }, [search])
    

    return <DataTable 
                title='Veiculos' 
                columns={columns} 
                data={filteredVeiculos}
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

export default VeiculosTable