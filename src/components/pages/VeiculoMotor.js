import VeiculoMotorTable from '../veiculoMotor/VeiculoMotorTable.js'
import Navbar from '../sidebar/Navbar.js'



function Abastecimento() {
   
    return (
        <div>
            <Navbar />
            <div className="bg-red-500 w-10/12 m-auto mt-10">
                <VeiculoMotorTable />
            </div>
           
        </div>
    )
}

export default Abastecimento