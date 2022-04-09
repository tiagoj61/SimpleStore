
import React, { useState } from "react";

const ListLug = ({ onChange, onDelete, onProcedure, empregado, empresa }) => {
    return (
        <div className="">
            <p></p>
            <p>Empregado:
            <input disabled value={empregado} onChange={onChange} className="" />

            Empresa:
            <input disabled value={empresa} className="" />
            </p>



        </div>
    );
};
export default ListLug;