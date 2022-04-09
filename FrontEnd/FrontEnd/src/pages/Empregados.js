import React, { useEffect, Component, useState } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';

import ListEmpregados from "../components/ListEmpregados"
import Calls from "../rest/Calls"


const Empregados = () => {
  const [tasks, setTasks] = useState([]);
  var list;
  useEffect(() => {
    const loadAll = async () => {
      list = await Calls.getEmpregadosList();
      let empresas = list[0].items.recordset
      const itensCopy = Array.from(tasks);
      empresas.forEach(element => {
        itensCopy.push({ id: element.id_empregado, nome: element.primeiro_nome, sobrenome: element.ultimo_nome, salario: element.salario });
      });
      setTasks(itensCopy)
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
    }).then((aux) => Promise.resolve(aux.json()).then(aux2 => { swal(aux2) }))


  }

  const deleteTask = (index) => {
    const itensCopy = Array.from(tasks);
    console.log(itensCopy[index].id)


    fetch('http://localhost:5000/deleteempregado', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        empregado: itensCopy[index].id
      })
    }).then(window.location.reload(false))

  }
  return (
    <div className="">
      <div className="">

        {tasks.map(({ id, nome, sobrenome, salario }, index) => (
          <ListEmpregados
            key={id}
            nome={nome}
            sobrenome={sobrenome}
            salario={salario}
            onDelete={() => deleteTask(index)}
            onProcedure={(event) => updateTask(event, index)}
          />
        ))}
      </div>

    </div>
  )
}

export default Empregados