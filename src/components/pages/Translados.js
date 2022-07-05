import TransladosTable from '../translados/TransladosTable.js'
import Navbar from '../sidebar/Navbar.js'



function Translados() {
   
    return (
        <div>
            <Navbar />

            <div className="bg-red-500 w-10/12 m-auto mt-10">
                <TransladosTable />
            </div>
           
        </div>
    )
}

export default Translados