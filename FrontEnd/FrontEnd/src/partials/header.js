import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'

class Header extends Component {
  render(){
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">

          <NavLink className="navbar-brand" to="/">Vendas</NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink exact className="nav-link" to="/">Home </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/EmpregadosLug">Empresa empregado</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Vendas">Atendimentos</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Empregados">Empregados</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/CadastroFuncionario">Cadastrar funcionario</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/CadastroAtendimento">Iniciar atendimento</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/PesquisaEmpresa">PesquisaEmpresa</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }

}

export default Header


