import React from 'react';
import {TableRender} from "../../../components/table-render";

const EmployeeListPage = () => {
    let columns = [
        {
            name: "name",
            label: "Nome",
        },
        {
            name: "cpf",
            label: "Cpf",
        },
        {
            name: "phone",
            label: "Telefone",
        },
    ];

    return (<TableRender columns={columns} title={'Funcionários'} />);
}

export default EmployeeListPage;
