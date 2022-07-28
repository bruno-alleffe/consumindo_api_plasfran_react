import TipoVeiculoTable from '../tipoVeiculo/TipoVeiculoTable.js'
import Navbar from '../sidebar/Navbar.js'



function TipoVeiculo() {
   
    return (
        <div>
            <Navbar />
            <div className="bg-red-500 w-10/12 m-auto mt-10">
                <TipoVeiculoTable />
            </div>
           
        </div>
    )
}

export default TipoVeiculo