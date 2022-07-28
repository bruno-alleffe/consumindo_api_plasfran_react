import { useState } from 'react'
import * as auth from './../services/auth.js'
import * as localstorage from './../utils/localstorage'
import { useNavigate  } from 'react-router-dom'
import "./styles.css";

function Login() {
    const [token, setToken] = useState('')
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [erro, setErro] = useState("")
    const navigate = useNavigate();
   
    async function login(e) {
        e.preventDefault()
        try {
            const response = await auth.login(email, password)
            console.log(response.data)
            setToken(response.data)
            localstorage.setItem("token", response.data)
            
            // redirect
            navigate('/translados', {message: 'Login feito com sucesso!'})
        } catch (err) {
            console.log(err)
            setErro("Email ou senha inválidos!")
        }
    }

    // function handleChange(e) {
    //     setForm({ ...form, [e.target.name]: e.target.value})
    //     console.log(form)
    // }
     
  

    return (
        <div className="container">
            <div className="container-login">
                <div className="wrap-login">
                <form className="login-form" onSubmit={login}>

                    <span className="login-form-title">
                    <img src="https://plasfran.com/images/logo_plasfran.png" alt="Grupo Plasfran" />
                    </span>
                    <span className="login-form-title"> Bem vindo </span>

                <div className="wrap-input">
                <input
                    className={email !== "" ? "has-val input" : "input"}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <span className="focus-input" data-placeholder="Email"></span>
                </div>

            <div className="wrap-input">
              <input
                className={password !== "" ? "has-val input" : "input"}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="focus-input" data-placeholder="Password"></span>
            </div>
            
            <div className="flex justify-center mb-8 -mt-20">
                {erro ? <span className='text-red-500 text-center'>{erro}</span> : ''}
            </div>
            
    
            <div className={erro ? "container-login-form-btn" : "container-login-form-btn2"}>
              <button type='submit' className="login-form-btn">Login</button>
            </div>

            <div className="text-center">
              <span className="txt1">Não possui conta? </span>
              <a className="txt2" href="#">
                Criar conta
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
    )
}

export default Login