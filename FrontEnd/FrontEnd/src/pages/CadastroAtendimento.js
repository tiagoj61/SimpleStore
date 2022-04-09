import React, { Component } from 'react'
import Calls from "../rest/Calls"
import Select from 'react-select'
import swal from 'sweetalert';
class CadastroAtendimento extends Component {
  state = {
    selectedOption: null,
  };
  constructor(props) {
    super(props);
    this.cliente = '';
    this.funcionario = '';
    this.empregados = [];
    this.options = [];
    this.atualizarNameCliente = this.atualizarNameCliente.bind(this);
    this.atualizarNameFuncionario = this.atualizarNameFuncionario.bind(this);
    this.addAtendimento = this.addAtendimento.bind(this);

    const loadAll = async () => {
      let list = await Calls.getEmpregadosList();
      let empregados = list[0].items.recordset;
      this.empregados=[];
      for (let i = 0; i <= empregados.length - 1; i++) {
        let aux ={ value: empregados[i].id_empregado, label: empregados[i].primeiro_nome+" "+empregados[i].ultimo_nome+" "+empregados[i].id_empregado }
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
  atualizarNameFuncionario(event) {
    this.funcionario = event.target.value;
  }
  addAtendimento() {
    fetch('http://localhost:5000/inseriratendimento', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cliente: this.cliente,
        empregado : this.state.selectedOption.value
      })
    })
    swal('Atendimento iniciado')


  }


  render() {
    const { selectedOption } = this.state;
    return (
      <div>
        <div className="card" style={{ backgroundColor: "grey" }}>
          <div className="card-body" style={{ padding: "50px" }}>
            <h1 className="my-5">Abrir comanda</h1>
            <div className="row">

              <div className="col-6 offset-3">
                <div className="form-group text-left">
                  <label htmlFor="name" >Nome do cliente</label>
                  <input type="text" className="form-control" id="nameC" onChange={this.atualizarNameCliente} />
                </div>
                <Select
                  placeholder='Empregados'

                  value={selectedOption}
                  onChange={this.selectiten}
                  onMenuOpen={this.handleChange}
                  options={this.options}
                />

                <a onClick={this.addAtendimento} className="btn btn-success btn-block my-5">Iniciar</a>

               
              </div>
            </div>
          </div>
        </div>
        <div>  </div></div>
    )
  }
}

export default CadastroAtendimento