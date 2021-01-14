import React from 'react';
import {TableRender} from "../../../components/table-render";
import {MaskColumn} from "../../../components/table-render/presentation";
import MaskEnum from "../../../components/form-builder/enum/mask.enum";


const ClientListPage = () => {
    let columns = [
        {
            name: "name",
            label: "Nome",
        },
        // {
        //     name: "zipcode",
        //     label: "Cep",
        // },
        // {
        //     name: "street",
        //     label: "Rua",
        // },
        // {
        //     name: "region",
        //     label: "Estado",
        // },
        {
            name: "cpf",
            label: "Cpf",
            options: {customBodyRender: value => MaskColumn(value, MaskEnum.CPF)}
        },
        {
            name: "cnpj",
            label: "Cnpj",
            options: {customBodyRender: value => MaskColumn(value, MaskEnum.CNPJ)}
        },
        {
            name: "phone",
            label: "Telefone",
            options: {customBodyRender: value => MaskColumn(value, MaskEnum.PHONE)}
        },
        {
            name: "email",
            label: "Email",
        },
        {
            name: "city",
            label: "Cidade",
        },
    ];

    return (<TableRender columns={columns} title={'Clientes'} />);
}

export default ClientListPage;
