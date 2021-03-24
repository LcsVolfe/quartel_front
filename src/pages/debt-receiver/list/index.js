import React from 'react';
import {TableRender} from "../../../components/table-render";
import {BooleanColumn, CurrencyColumn, DateColumn, OptionsColumn} from "../../../components/table-render/presentation";
import {GatewayOptions} from "../../order/form/options";
import {colors} from "@material-ui/core";

const DebtReceiveListPage = () => {
    let columns = [
        {
            name: "client",
            label: "Cliente",
            options: {customBodyRender: (value)=>value?.name}
        },
        {
            name: "amount",
            label: "Total",
            options: {customBodyRender: CurrencyColumn},
        },
        {
            name: "dateDue",
            label: "Data Vencimento",
            options: {customBodyRender: (value, data) => DateColumn(value)},
            // options: {customBodyRender: (value, data) => {
            //     let color = data.rowData[6] ? '#000' : new Date() > new Date(value) ? colors.red['700'] : colors.green['700'];
            //     return (<span style={{color: color}}>{DateColumn(value)}</span>)
            //     }},
        },
        {
            name: "dateReceive",
            label: "Data Recebimento",
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
            name: 'isReceive',
            label: 'Recebido',
            options: {customBodyRender: BooleanColumn},
        },
        {
            name: 'isMonthly',
            label: 'Mensal Fixa',
            options: {customBodyRender: BooleanColumn},
        }
    ];

    return (<TableRender columns={columns} title={'Contas a Receber'} />);
}

export default DebtReceiveListPage;
