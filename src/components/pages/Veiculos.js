import Navbar from '../sidebar/Navbar.js'
import VeiculosTable from '../veiculos/VeiculosTable.js'



function Veiculos() {
   
    return (
        <div>
            <Navbar />
            <div className="bg-red-500 w-11/12 m-auto mt-10">
                <VeiculosTable />
            </div>
           
        </div>
    )
}

export default Veiculos