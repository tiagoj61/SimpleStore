import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import ListItems from '../components/ListItems';

import Calls from "../rest/Calls"

const Vendas = () => {
  const [tasks, setTasks] = useState([]);
  var list;
  useEffect(() => {
    const loadAll = async () => {
      list = await Calls.getHomeList();
      let empresas = list[0].items.recordset
      const itensCopy = Array.from(tasks);
      fetch('http://localhost:5000/listempregados', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((aux) => Promise.resolve(aux.json()).then(aux2 => {
        empresas.forEach(element => {
          aux2.recordsets[0].forEach(aux3 => {
            if (element.id_empregado == aux3.id_empregado) {
              itensCopy.push({
                id: element.id_atendimento, nomeCliente: element.nome_cliente, nome: aux3.primeiro_nome, sobrenome: aux3.ultimo_nome
              });
            }
          })
        });
        setTasks(itensCopy)
      }))
    }

    loadAll();
  }, []);



  const updateTask = ({ target }, index) => {
    const itensCopy = Array.from(tasks);

    fetch('http://localhost:5000/procedure1', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_atendimento: itensCopy[index].id
      })
    }).then((aux) => Promise.resolve(aux.json()).then(aux => {
      if (aux.length != 0) {
        if (aux.length == 1) {
          swal('A empresa, ' + aux[0].Nome_Lugar + ', deste funcionario possue mais que 2 funcionarios')
        } else {
          var str = "";
          aux.forEach((element) => {
            str = str + ", " + element.Nome_Lugar
          })
          swal('As empresas' + str + ', deste funcionario possuem mais que 2 funcionarios')
        }

      } else { swal('Condições da procedure não atendidas') }
    }))

  }

  const deleteTask = (index) => {
    const itensCopy = Array.from(tasks);

    fetch('http://localhost:5000/deleteatendimento', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cliente: itensCopy[index].value
      })
    })
    window.location.reload(false);
  }
  return (
    <div className="">
      <div className="">

        {tasks.map(({ id, nomeCliente, nome, sobrenome }, index) => (
          <ListItems
            key={id}
            nomeCliente={nomeCliente}
            nome={nome}
            sobrenome={sobrenome}
            onDelete={() => deleteTask(index)}
            onProcedure={(event) => updateTask(event, index)}
          />
        ))}
      </div>

    </div>
  )
}

export default Vendas