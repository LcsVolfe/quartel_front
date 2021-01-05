import React, {useEffect, useState} from 'react';
import TableRenderComponent from "../../../components/tableRender";
import ApiService from "../../../service";

const ClientListPage = (props) => {
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
    let [data, setData] = useState([]);

    useEffect( async () => {
        setData(await ApiService.ListClients());
    }, []);

    return (<TableRenderComponent columns={columns} data={data} />);
}

export default ClientListPage;
