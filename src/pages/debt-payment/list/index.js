import React from 'react';
import {TableRender} from "../../../components/table-render";
import {BooleanColumn, CurrencyColumn, DateColumn, OptionsColumn} from "../../../components/table-render/presentation";
import {GatewayOptions} from "../../order/form/options";

const DebtPaymentListPage = () => {
    let columns = [
        {
            name: "provider",
            label: "Fornecedor",
            options: {customBodyRender: (value)=>(<span>{value?.name}</span>)}
        },
        {
            name: "amount",
            label: "Total",
            options: {customBodyRender: CurrencyColumn},
        },
        {
            name: "dateDue",
            label: "Data Vencimento",
            options: {customBodyRender: DateColumn},
        },
        {
            name: "datePay",
            label: "Data Vencimento",
            options: {customBodyRender: DateColumn},
        },
        {
            name: "documentNumber",
            label: "N. Documento",
        },
        {
            name: 'gateway',
            label: 'Forma Pagamento',
            options: {customBodyRender: (value)=>OptionsColumn(value, GatewayOptions)},
        },
        {
            name: 'isPaid',
            label: 'Paga',
            options: {customBodyRender: BooleanColumn},
        },
        {
            name: 'isMonthly',
            label: 'Mensal Fixa',
            options: {customBodyRender: BooleanColumn},
        }
    ];

    return (<TableRender columns={columns} title={'Fornecedores'} />);
}

export default DebtPaymentListPage;
