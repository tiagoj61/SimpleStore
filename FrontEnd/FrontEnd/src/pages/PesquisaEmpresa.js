import React, { useEffect, Component } from 'react'
import Calls from "../rest/Calls"
import Select from 'react-select'
import swal from 'sweetalert';

class PesquisaEmpresa extends Component {
  state = {
    selectedOption: null,

  };
  constructor(props) {
    super(props);
    this.cliente = '';
    this.funcionario = '';
    this.empregados = [{ value: 'asd', label: 'asd' }]
    this.options = [
    ];
    this.atualizarNameCliente = this.atualizarNameCliente.bind(this);
    this.atualizarNameFuncionario = this.atualizarNameFuncionario.bind(this);
    this.addAtendimento = this.addAtendimento.bind(this);
    this.deleteLug = this.deleteLug.bind(this);

    const loadAll = async () => {
      let list = await Calls.getLugaresList();
      let empregados = list[0].items.recordset
      this.empregados = []
      for (let i = 0; i <= empregados.length - 1; i++) {
        let aux = { value: empregados[i].id_lugar, label: empregados[i].nome_lugar, cnpj: empregados[i].cnpj }
        this.empregados.push(aux)
      }

    }
    loadAll();

  }
  sad = selectedOption => {

    this.options = this.empregados

    this.setState(
      { selectedOption },
      () => console.log(`Option selected:`, this.state.selectedOption)

    );

  };
  handleChange = selectedOption => {

    this.options = this.empregados

    this.setState(
      { selectedOption },
      () => console.log(`Option selected:`, this.state.selectedOption)

    );
  };
  deleteLug(event) {

    fetch('http://localhost:5000/deletelugar', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lugar: this.state.selectedOption.value
      })
    }).then((a) => Promise.resolve(a.json()).then(a => {
      swal('removido')
    }));

  }
  atualizarNameCliente(event) {
    this.cliente = event.target.value;
  }
  atualizarNameFuncionario(event) {

    this.funcionario = event.target.value;
  }
  addAtendimento() {

    fetch('http://localhost:5000/procedure2', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cnpj: this.state.selectedOption.cnpj
      })
    }).then((aux) => Promise.resolve(aux.json()).then(aux2 => {
      if (aux2 != null) {
        var aux3 = 'Clientes: ';
        var i = 0;
        aux2.forEach(q => {
          if (i == 0) {
            aux3 = aux3 + q.Nome_Cliente;
            i++;
          } else { aux3 = aux3 + ' , ' + q.Nome_Cliente; }

        });
        if (aux2.length < 1) { aux3 = 'Condições de procedure não atendidas' }
        swal(aux3)
      }
    }))


  }


  render() {
    const { selectedOption } = this.state;
    return (
      <div>
        <div className="card" style={{ backgroundColor: "grey" }}>
          <div className="card-body" style={{ padding: "50px" }}>
            <h1 className="my-5">PesquisaEmpresa</h1>
            <div className="row">

              <div className="col-6 offset-3">

                <Select
                  placeholder='Empresas'

                  value={selectedOption}
                  onChange={this.sad}
                  onMenuOpen={this.handleChange}
                  options={this.options}
                />

                <a onClick={this.addAtendimento} className="btn btn-warning btn-block my-5">Procedure</a>
                <a onClick={this.deleteLug} className="btn btn-danger btn-block my-5">Remover</a>


              </div>
            </div>
          </div>
        </div>
        <div>  </div></div>
    )
  }
}

export default PesquisaEmpresa