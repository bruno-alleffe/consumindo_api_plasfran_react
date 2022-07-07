import React from "react"
import DataTable from "react-data-table-component"
import * as veiculoMotor from '../services/veiculoMotor.js'
import { useState, useEffect } from 'react'
import ModalAdicionarEditar from "./ModalAdicionarEditar.js"
import ModalDeletar from "./ModalDeletar.js"
import { toast } from 'react-toastify'

const VeiculoMotorTable = () => {
    const [search, setSearch] = useState("")
    const [veiculosMotores, setVeiculosMotores] = useState([])
    const [filteredVeiculosMotores, setFilteredVeiculosMotores] = useState([])
    
    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
            width: "80px",
        },
        {
            name: "Motor",
            selector: (row) => row.descricao,
            sortable: true,
            width: "650px",
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
        
        const response = await veiculoMotor.getVeiculosMotores()
        if(response.success){
            setVeiculosMotores(response.data)
            setFilteredVeiculosMotores(response.data)
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
        const result = veiculosMotores.filter((aba) => {
            return aba.descricao.toLowerCase().match(search.toLowerCase())
        })

        setFilteredVeiculosMotores(result)
    }, [search])
    

    return <DataTable 
                title='Veículo Motor' 
                columns={columns} 
                data={filteredVeiculosMotores} 
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

export default VeiculoMotorTable