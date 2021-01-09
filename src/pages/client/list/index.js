import React from 'react';
import {TableRender} from "../../../components/table-render";


const ClientListPage = () => {
    let columns = [
        {
            name: "name",
            label: "Nome",
        },
        {
            name: "zipcode",
            label: "Cep",
        },
        {
            name: "street",
            label: "Rua",
        },
        {
            name: "city",
            label: "Cidade",
        },
        {
            name: "region",
            label: "Estado",
        },
        {
            name: "cpf",
            label: "Cpf",
        },
        {
            name: "cnpj",
            label: "Cnpj",
        },
        {
            name: "phone",
            label: "Telefone",
        },
        {
            name: "email",
            label: "Email",
        },
    ];

    return (<TableRender columns={columns} title={'Clientes'} />);
}

export default ClientListPage;
