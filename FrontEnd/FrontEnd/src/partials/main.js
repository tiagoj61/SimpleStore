import React, {Component} from 'react'
import './main.scss'
import Home from '../pages/home'
import Vendas from '../pages/Vendas'
import Empregados from '../pages/Empregados'
import CadastroAtendimento from '../pages/CadastroAtendimento'
import CadastroFuncionario from '../pages/CadastroFuncionario'
import { Route, Switch } from "react-router-dom";
import PesquisaEmpresa from '../pages/PesquisaEmpresa'
import EmpregadosLug from '../pages/EmpregadosLug'

class Main extends Component {
  render() {
    return (
      <main className="container">
        <Switch>
          <Route exact path="/" component={Home}/>
          
          <Route path="/EmpregadosLug" component={EmpregadosLug}/>
          <Route path="/Vendas" component={Vendas}/>
          <Route path="/Empregados" component={Empregados}/>
          <Route path="/CadastroAtendimento" component={CadastroAtendimento}/>
          <Route path="/CadastroFuncionario" component={CadastroFuncionario}/>
          <Route path="/PesquisaEmpresa" component={PesquisaEmpresa}/>
        </Switch>
      </main>
    )
  }
}

export default Main 