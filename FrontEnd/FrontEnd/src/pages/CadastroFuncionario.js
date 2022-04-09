import React, { useEffect, Component } from 'react'
import Calls from "../rest/Calls"
import Select from 'react-select'
import swal from 'sweetalert';
class CadastroFuncionario extends Component {
  state = {
    selectedOption: null,
  };
  constructor(props) {
    super(props);
    this.cliente = '';
    this.funcionario = '';
    this.salario = '';
    this.empregados = []
    this.options = [];
    this.atualizarNameCliente = this.atualizarNameCliente.bind(this);
    this.atualizarNameFuncionario = this.atualizarNameFuncionario.bind(this);
    this.atualizaSalario = this.atualizaSalario.bind(this);
    this.addAtendimento = this.addAtendimento.bind(this);
 

    const loadAll = async () => {
      let list = await Calls.getLugaresList();
      let empregados = list[0].items.recordset
      this.empregados = []
      for (let i = 0; i <= empregados.length - 1; i++) {
        let aux = { value: empregados[i].id_lugar, label: empregados[i].nome_lugar }
        this.empregados.push(aux)
      }

    }
    loadAll();

  }
  selectiten = selectedOption => {
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

  atualizarNameCliente(event) {
    this.cliente = event.target.value;
  }
  atualizaSalario(event) {
    this.salario = event.target.value;
  }
  atualizarNameFuncionario(event) {

    this.funcionario = event.target.value;
  }
  addAtendimento() {
    fetch('http://localhost:5000/inserirempregado', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        primeiro_nome: this.cliente,
        ultimo_nome: this.funcionario,
        salario: this.salario
      })
    })
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        primeiro_nome: this.cliente,
        ultimo_nome: this.funcionario
      })
    };
    fetch('http://localhost:5000/getIdFromEmpregados', requestOptions)
      .then(response => Promise.resolve(response.json()).then(a => {
        fetch('http://localhost:5000/inserempregadolugar', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_empregado: a[0].id_empregado,
            id_lugar: this.state.selectedOption.value
          })
        }).then(() => { swal('Funcionario inserido').then(window.location.reload(false));  })


      }))



  }


  render() {
    const { selectedOption } = this.state;
    return (
      <div>
        <div className="card" style={{ backgroundColor: "grey" }}>
          <div className="card-body" style={{ padding: "50px" }}>
            <h1 className="my-5">Cadastro de funcionarios</h1>
            <div className="row">

              <div className="col-6 offset-3">
                <div className="form-group text-left">
                  <label htmlFor="name" >Primeiro nome do funcionario</label>
                  <input type="text" className="form-control" onChange={this.atualizarNameCliente} />
                </div>
                <div className="form-group text-left">
                  <label htmlFor="name" >Ultimo nome do funcionario</label>
                  <input type="text" className="form-control" onChange={this.atualizarNameFuncionario} />
                </div>
                <div className="form-group text-left">
                  <label htmlFor="name" >Salario</label>
                  <input type="text" className="form-control" onChange={this.atualizaSalario} />
                </div>
                <Select
                  placeholder='Empresas'
                  value={selectedOption}
                  onChange={this.selectiten}
                  onMenuOpen={this.handleChange}
                  options={this.options}
                />
                <a onClick={this.addAtendimento} className="btn btn-success btn-block my-5">Cadastrar</a>

              </div>
            </div>
          </div>
        </div>
        <div>  </div></div>
    )
  }
}

export default CadastroFuncionario