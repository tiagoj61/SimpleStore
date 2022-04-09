import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div className="jumbotron mt-5">
        <h1 className="display-4">Home</h1>
        <p className="lead">BD2</p>
        <hr className="my-4"/>
        <p>Controle de comandas</p>
        <Link className="btn btn-success btn-lg" to="/Vendas">Ver todas as comandas</Link>
      </div>
    )
  }
}

export default Home