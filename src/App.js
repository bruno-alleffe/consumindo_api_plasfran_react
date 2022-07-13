import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/pages/Login.js'
import Translados from './components/pages/Translados.js'
import Abastecimento from './components/pages/Abastecimento'
import VeiculoMotor from './components/pages/VeiculoMotor.js'
import TipoVeiculo from './components/pages/TipoVeiculo.js'
import VeiculoMarca from './components/pages/VeiculoMarca.js'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route path="/translados" element={<Translados />}></Route>
          <Route path="/abastecimento" element={<Abastecimento />}></Route>
          <Route path="/motor" element={<VeiculoMotor />}></Route>
          <Route path="/tipoVeiculo" element={<TipoVeiculo />}></Route>
          <Route path="/veiculoMarca" element={<VeiculoMarca />}></Route>
        </Routes>
        <ToastContainer />
    </Router>
  )
}

export default App;
