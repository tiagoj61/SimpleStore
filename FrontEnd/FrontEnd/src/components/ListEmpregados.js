
import React, { useState } from "react";

const ListEmpregados = ({ onChange, onDelete,onProcedure, nome,sobrenome,salario }) => {
    return (
        <div className="">
            <p></p>
              <p>Funcionario</p>
            <input disabled value={nome} onChange={onChange} className="" />
            <input disabled value={sobrenome}  className="" />
            <p></p>
            <p>Salario</p>
            <input disabled value={salario}  className="" />
            <p></p>
            <button className="btn btn-danger btn-sm ml-3" onClick={onDelete}><i className="far fa-trash-alt"></i> Remover</button>
        </div>
    );
};
export default ListEmpregados;