import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/pages/Login.js'
import Translados from './components/pages/Translados.js'
import Abastecimento from './components/pages/Abastecimento'

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route path="/translados" element={<Translados />}></Route>
          <Route path="/abastecimento" element={<Abastecimento />}></Route>
        </Routes>
    </Router>
  )
}

export default App;
