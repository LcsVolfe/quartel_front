import React from 'react';
import {TableRender} from "../../../components/table-render";
import {Switch} from "@material-ui/core";

const ProductListPage = () => {
    let columns = [
        {
            name: "name",
            label: "Nome",
        },
        {
            name: "price",
            label: "Preço",
        },
        {
            name: 'qty',
            label: 'Quantidade',
        },
        {
            name: 'unity',
            label: 'Unidade',
        },
        {
            name: 'puchaseDate',
            label: 'Data Compra',
        },
        {
            name: 'description',
            label: 'Descrição',
        },
        {
            name: 'epi',
            label: 'EPI',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <div>
                        <Switch checked={value} color={'primary'}/>
                    </div>;
                }
            },
        },
        {
            name: "isSelling",
            label: "Venda",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <div>
                        <Switch checked={value} color={'primary'}/>
                    </div>;
                }
            },
        },
        {
            name: 'quartel',
            label: 'Quartel',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <div>
                        <Switch checked={value} color={'primary'}/>
                    </div>;
                }
            },
        },
        {
            name: 'tool',
            label: 'Ferramenta',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <div>
                        <Switch checked={value} color={'primary'}/>
                    </div>;
                }
            },
        },
    ];

    return (<TableRender columns={columns} />);
}

export default ProductListPage;

