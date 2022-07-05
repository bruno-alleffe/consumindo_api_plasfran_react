import { useContext, useState } from "react"
import DataContext from "../context/DataContext"
import * as translados from "./../services/translados.js"

function DataProvider({children}) {
    const [data, setData] = useState([])


    return(
        <DataContext.Provider value={{data, setData}} >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider