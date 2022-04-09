
import React from "react";

const ListItems = ({ onChange, onDelete, onProcedure, nomeCliente, nome, sobrenome }) => {
    return (
        <div className="">
            <p>Funcionario</p>
            <p>  <input disabled value={nome} className="" />
                <input disabled value={sobrenome} className="" /></p>
            <p>Cliente</p>
            <p> <input disabled value={nomeCliente} onChange={onChange} className="" /></p>
            <button className="btn btn-danger btn-sm ml-3" onClick={onDelete}><i className="far fa-trash-alt"></i> Remover</button>
            <button className="btn btn-warning btn-sm ml-3" onClick={onProcedure}><i className="fa fa-exclamation"></i> procedure</button>
            <p></p>
        </div>
    );
};
export default ListItems;