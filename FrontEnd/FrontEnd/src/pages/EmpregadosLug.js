import React, { useEffect, Component, useState } from 'react'
import swal from 'sweetalert';
import ListLug from '../components/ListLug';

const EmpregadosLug = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const loadAll = async () => {
      fetch('http://localhost:5000/get', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((aux) => Promise.resolve(aux.json()).then(aux2 => {
        const itensCopy = Array.from(tasks);
        aux2.recordset.forEach(element => {
          itensCopy.push({ id: element.nome_lugar, empregado: element.primeiro_nome + " " + element.ultimo_nome, empresa: element.nome_lugar });
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
    }).then((aux) => Promise.resolve(aux.json()).then(aux2 => { swal(aux2) }))

  }

  const deleteTask = (index) => {
    const itensCopy = Array.from(tasks);
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

        {tasks.map(({ id, empregado, empresa }, index) => (
          <ListLug
            key={id}
            empregado={empregado}
            empresa={empresa}
            onDelete={() => deleteTask(index)}
            onProcedure={(event) => updateTask(event, index)}
          />
        ))}
      </div>

    </div>
  )
}

export default EmpregadosLug