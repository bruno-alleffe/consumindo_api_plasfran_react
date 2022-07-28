import Navbar from '../sidebar/Navbar.js'
import VeiculoMarcaTable from '../veiculoMarca/VeiculoMarcaTable.js'



function VeiculoMarca() {
   
    return (
        <div>
            <Navbar />
            <div className="bg-red-500 w-10/12 m-auto mt-10">
                <VeiculoMarcaTable />
            </div>
           
        </div>
    )
}

export default VeiculoMarca