import React from 'react';
import {TableRender} from "../../../components/table-render";
import {
    BooleanColumn,
    CurrencyColumn,
    DateColumn,
    EnumColumn,
    NumberColumn
} from "../../../components/table-render/presentation";
import {UnityOptions} from "../form/options";

const ProductListPage = () => {
    let columns = [
        {
            name: "name",
            label: "Nome",
        },
        {
            name: "price",
            label: "Preço",
            options: {customBodyRender: CurrencyColumn}
        },
        {
            name: "cost",
            label: "Custo",
            options: {customBodyRender: CurrencyColumn}
        },
        {
            name: 'qty',
            label: 'Quantidade',
            options: {customBodyRender: NumberColumn},
        },
        {
            name: 'unity',
            label: 'Unidade',
            options: {customBodyRender: (value)=>EnumColumn(value, UnityOptions)},
        },
        {
            name: 'puchaseDate',
            label: 'Data Compra',
            options: {customBodyRender: DateColumn},
        },
        {
            name: 'description',
            label: 'Descrição',
        },
        {
            name: 'epi',
            label: 'EPI',
            options: {customBodyRender: BooleanColumn},
        },
        {
            name: "isSelling",
            label: "Venda",
            options: {customBodyRender: BooleanColumn},
        },
        {
            name: 'quartel',
            label: 'Quartel',
            options: {customBodyRender: BooleanColumn},
        },
        {
            name: 'tool',
            label: 'Ferramenta',
            options: {customBodyRender: BooleanColumn},
        },
    ];

    return (<TableRender columns={columns} title={'Produtos'} />);
}

export default ProductListPage;

