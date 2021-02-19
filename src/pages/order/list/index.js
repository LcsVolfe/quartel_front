import {TableRender} from "../../../components/table-render";
import {CurrencyColumn, OptionsColumn} from "../../../components/table-render/presentation";
import {UnityOptions} from "../../product/form/options";
import {GatewayOptions, StatusOptions} from "../form/options";

const OrderListPage = () => {
    let columns = [
        {
            name: "client",
            label: "Cliente",
            options: {customBodyRender: (value)=>(<span>{value?.name}</span>)}
        },
        {
            name: "name",
            label: "Nome da Obra",
        },
        {
            name: "grandTotal",
            label: "Total Final",
            options: {customBodyRender: CurrencyColumn}
        },
        // {
        //     name: "discount",
        //     label: "Desconto",
        //     options: {customBodyRender: CurrencyColumn}
        // },
        // {
        //     name: "profit",
        //     label: "Lucro",
        //     options: {customBodyRender: CurrencyColumn}
        // },
        {
            name: "gateway",
            label: "Pagamento",
            options: {customBodyRender: (value)=>OptionsColumn(value, GatewayOptions)},
        },
        {
            name: "status",
            label: "Status",
            options: {customBodyRender: (value)=>OptionsColumn(value, StatusOptions)},
        },
        // {
        //     name: "employeeLine",
        //     label: "Funcionários",
        //     options: {customBodyRender: (value)=> (<span>{value?.length}</span>)},
        // },
    ];

    return (<TableRender title={'Serviços'} columns={columns}/>);
}

export default OrderListPage;
