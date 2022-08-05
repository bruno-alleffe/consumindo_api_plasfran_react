import React from "react"
import DataTable from "react-data-table-component"
import * as abastecimentoV2Req from '../services/abastecimentoV2Req.js'
import { useState, useEffect } from 'react'
import ModalAdicionarEditar from "./ModalAdicionarEditar.js"
import ModalDeletar from "./ModalDeletar.js"
import { toast } from 'react-toastify'
import * as FaIcons from 'react-icons/fa';
import Moment from 'moment'
import Select from 'react-select'
import * as AiIcons from 'react-icons/ai';

const AbastecimentoV2Table = () => {
    const [search, setSearch] = useState("")

    const [abastecimentos, setAbastecimentos] = useState([])
    const [filteredAbastecimento, setFilteredAbastecimento] = useState([])

    const [veiculos, setVeiculos] = useState([])
    const [selectedVeiculo, setSelectedVeiculo] = useState(null)

    const [motoristas, setMotoristas] = useState([])
    const [selectedMotorista, setSelectedMotorista] = useState(null)

    const [filtro, setFiltro] = useState([])

    function formataData(dataSemFormato) {
        var dataFormatada = Moment(dataSemFormato).format("DD/MM/YYYY HH:mm")
        return dataFormatada
    }
    
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
            name: 'Veiculo',
            cell: row => 
            <>   
                <div className="flex">
                    <div>
                        {<h6 className="text-blue-600 w-20">{row.placa}</h6>}
                        <div className="bg-gray-300 font-bold rounded p-1">
                            {<h6 className="">{row.marca}</h6>}
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div>
                        {<h6 className="inline-block p-1 mt-3">{row.modelo}</h6>}
                    </div>
                
                </div>
            </>,
            sortable: true,
            width: "260px",
            style: {
                fontSize: '11px',
                height: "70px",
            },
        },
        {
            name: "Abastecimento ant.",
            selector: (row) => row.dataAbastecimentoAnterior,
            cell: row => 
            <>   
                <div className="flex">
                    <div className="text-xl text-white bg-gray-500 rounded-full p-2">
                        <FaIcons.FaGasPump className=""/>
                    </div>
                </div>
                <div className="flex">
                    <div>
                        {<h6 className="mx-1 w-40 font-bold">{formataData(row.dataAbastecimentoAnterior)}</h6>}
                        {<h6 className="mx-1 inline-block">{row.kmAnterior} Km</h6>}
                        
                    </div>
                
                </div>
            </>,
            sortable: true,
            width: "170px",
            style: {
                fontSize: '11px',
                height: "70px",
            },
        },
        {
            name: "Abastecimento atual",
            selector: (row) => row.dataAbastecimento,
            cell: row => 
            <>   
                <div className="flex">
                    <div className="text-xl text-white bg-green-500 rounded-full p-2">
                        <FaIcons.FaGasPump className=""/>
                    </div>
                </div>
                <div className="flex">
                    <div>
                        {<h6 className="mx-1 w-28 font-bold">{formataData(row.dataAbastecimento)}</h6>}
                        {<h6 className="mx-1 inline-block">{row.kmAtual} Km</h6>}
                    </div>
                </div>
                <div className="flex">
                    <div className="border-x-2">
                        {<h6 className="mx-1 w-10 font-bold">{(row.litros)}</h6>}
                        {<h6 className="mx-1 inline-block">Litros</h6>}
                    </div>
                </div>
                <div className="flex">
                    <div className="border-r-2">
                        {<h6 className="mx-1 w-8 font-bold">{(row.kmL)}</h6>}
                        {<h6 className="mx-1 inline-block">Km/L</h6>}
                    </div>
                </div>
            </>,
            sortable: true,
            width: "270px",
            style: {
                fontSize: '11px',
                height: "70px",
            },
        },
        {
            name: "Combustível",
            selector: (row) => row.combustivel,
            sortable: true,
            width: "150px",
            style: {
                fontSize: '12px',
            },
        },
        {
            name: "Valor",
            selector: (row) => row.valorTotal,
            cell: row => 
            <>   
                <div className="flex">
                    <div>
                        {<h6 className="mx-1 w-40 font-bold">R$ {row.valorTotal}</h6>}
                        {<h6 className="mx-1 inline-block">R$ {row.valorLitro} / Litro</h6>}
                        
                    </div>
                
                </div>
            </>,
            sortable: true,
            width: "120px",
            style: {
                fontSize: '11px',
                height: "70px",
            },
        },
        {
            name: "Ações",
            cell: (row) => <ModalAdicionarEditar atualizarTabela={updateData} id2={row.id} tipo={"editar"}/>,
            width: "120px",
            style: {
                fontSize: '12px',
            },
        },
        {
            name: "",
            cell: (row) => <ModalDeletar atualizarTabela={updateData} id={row.id} />,
            width: "130px",
            style: {
                fontSize: '12px',
            },
        },
    ]
       
    async function updateData() {
        
        const response = await abastecimentoV2Req.getAbastecimentos()
        if(response.success){
            setAbastecimentos(response.data)
            setFilteredAbastecimento(response.data)
            console.log(response.data);
        } else {
            toast.error(`Erro: ${response.data}`, {
                position: toast.POSITION.TOP_CENTER
            })
        }
    }

    async function filtrar() {
        var dataInicio = new Date(filtro.dataInicio ? filtro.dataInicio : "2022-06-05").toISOString()
        var dataFim = new Date(filtro.dataFim ? filtro.dataFim : "2022-08-10").toISOString()
        console.log(selectedMotorista, selectedVeiculo);
        const response = await abastecimentoV2Req.getAbastecimentosFiltra(dataInicio, dataFim, selectedMotorista == null ? null : selectedMotorista.value, selectedVeiculo == null ? null : selectedVeiculo.value)
        if(response.success){
            setAbastecimentos(response.data)
            setFilteredAbastecimento(response.data)
            setFiltro([])
            setSelectedMotorista(null)
            setSelectedVeiculo(null)
            console.log(response.data);
        } else {
            toast.error(`Erro: ${response.data}`, {
                position: toast.POSITION.TOP_CENTER
            })
        }
    }

    async function pegarVeiculos() {
        const response = await abastecimentoV2Req.getVeiculos()
        if(response.success) {
          console.log(response.data)
          var veiculos = response.data.map(function(veiculo, i) {
            return {
              value: veiculo.id,
              label: (
                      <div className="text-xs">
                        <h6 className='font-bold'>{veiculo.placa}</h6>
                        <div className='flex justify-start'>
                          
                          <div className="flex w-40 items-center">
                            <AiIcons.AiFillCar className="mr-1"/>
                            <h6>{veiculo.veiculoMarca.descricao}</h6>
                          </div>
  
                          <div className='flex w-60 items-center mx-4'>
                            <AiIcons.AiFillTag className="mr-1"/>
                            <h6>{veiculo.veiculoModelo.descricao}</h6>
                          </div>
  
                          <div className='flex items-center'>
                            <FaIcons.FaBus className="mr-1"/>
                            <h6>{veiculo.veiculoTipo.descricao}</h6>
                          </div>
                          
                          
                        </div>
                      </div> 
                      
                      ),
              veiculoTipoMotorId: veiculo.veiculoTipoMotorId
            }
          })
          setVeiculos(veiculos)
        } else {
          console.log(response.data)
        }
      }
  
      async function pegarMotoristas() {
        const response = await abastecimentoV2Req.getMotoristas()
        if(response.success) {
          console.log(response.data)
          var motoristas = response.data.map(function(motorista, i) {
            return {
              value: motorista.id,
              label: motorista.nome
            }
          })
          setMotoristas(motoristas)
        } else {
          console.log(response.data)
        }
      }

    useEffect(() => {
        updateData()
        pegarVeiculos()
        pegarMotoristas()
    }, [])

    useEffect(() => {
        const result = abastecimentos.filter((aba) => {
            return aba.placa.toLowerCase().match(search.toLowerCase())
        })

        setFilteredAbastecimento(result)
    }, [search])
    
    function handleChange(e) {
        setFiltro({ ...filtro, [e.target.name]: e.target.value})
        console.log(filtro)
        
        // var data = new Date(e.target.value).toISOString()
        // console.log(data);
    }

    const handleChangeSelectVeiculo = e => {
        setSelectedVeiculo(e)
        console.log(selectedVeiculo);
    }
  
    const handleChangeSelectMotorista = e => {
        setSelectedMotorista(e)
        console.log(selectedMotorista);
    }

    return (
            <div>
                <div className="text-2xl mb-5 w-full flex">
                    <h1 className="w-2/4">Veiculo Abastecimento</h1>
                </div>
                
                <div className="text-2xl mb-4 w-full flex">
                    <div className="w-full flex justify-end">
                        <ModalAdicionarEditar atualizarTabela={updateData} tipo={"adicionar"}/>
                    </div>
                </div>
                <div className="flex w-full items-end">
                    <div className="w-1/2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Data Inicio:
                        </label>
                        <input value={filtro.dataInicio || ''} onChange={handleChange} type="date" name="dataInicio" id="dataInicio" className="mb-4 w-full mr-2 appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" aria-describedby="nomeHelp" required />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Data Fim:
                        </label>
                        <input value={filtro.dataFim || ''} onChange={handleChange} type="date" name="dataFim" id="dataFim" className="mb-4 w-full ml-2 appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" aria-describedby="nomeHelp" required />
                    </div>
                </div>
                <div className="flex w-full items-end">
                     <div className="w-2/5">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Veiculo:
                        </label>
                        <Select 
                            placeholder="Selecione"
                            options={veiculos}
                            value={selectedVeiculo || ''}
                            onChange={handleChangeSelectVeiculo}
                            required
                            className='w-11/12 z-50'
                        />
                    </div>
                    <div className="w-2/5">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Motorista:
                        </label>
                        <Select 
                            placeholder="Selecione"
                            options={motoristas}
                            value={selectedMotorista || ''}
                            onChange={handleChangeSelectMotorista}
                            required
                            className='w-11/12 z-50'
                        />
                    </div>
                    <div className="w-1/5">
                        <button onClick={filtrar} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <AiIcons.AiOutlineSearch className="h-5 w-5 text-white-500 group-hover:text-white-400" aria-hidden="true" />
                            Pesquisar
                        </button>
                    </div>
                </div>
                
                <DataTable 
                    // title='Veiculo Abastecimento' 
                    columns={columns} 
                    data={filteredAbastecimento}
                    pagination
                    paginationRowsPerPageOptions={[2, 10, 15, 20, 25, 30]}
                    fixedHeader
                    fixedHeaderScrollHeight="450PX"
                    // actions={<ModalAdicionarEditar atualizarTabela={updateData} tipo={"adicionar"}/>}
                    subHeader
                    // subHeaderComponent={
                    //     <input  
                    //         type="text" 
                    //         className="appearance-none rounded-none relative block w-60 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                    //         placeholder="Pesquisar"
                    //         value={search}
                    //         onChange={(e) => setSearch(e.target.value)}
                    //     />
                    // }
                />
            </div>
    )
            
}

export default AbastecimentoV2Table