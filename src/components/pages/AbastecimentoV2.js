import Navbar from '../sidebar/Navbar.js'
import AbastecimentoV2Table from '../abastecimentoV2/AbastecimentoV2Table.js'



function AbastecimentoV2() {
   
    return (
        <div>
            <Navbar />
            <div className="mx-4 m-auto mt-4">
                <AbastecimentoV2Table />
            </div>
           
        </div>
    )
}

export default AbastecimentoV2