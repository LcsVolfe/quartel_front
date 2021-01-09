import {TableRender} from "../../../components/table-render";

const OrderListPage = () => {
    let columns = [
        {
            name: "grandTotal",
            label: "Total Final",
        },
        {
            name: "discount",
            label: "Desconto",
        },
        {
            name: "gateway",
            label: "Gateway",
        },
        {
            name: "status",
            label: "Status",
        },
        {
            name: "squareMeter",
            label: "Metro Quadrado",
        },
    ];

    return (<TableRender title={'Serviços'} columns={columns}/>);
}

export default OrderListPage;
