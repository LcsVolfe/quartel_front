import {TableRender} from "../../../components/table-render";

var orders = [
    {
        grandTotal: 100,
        discount: 10,
       // lines: [line],
       // client: client,
        gateway: 10,
       // dateOrdered: new Date(),
       // dateFinish: new Date(),
        status: 10,
       // tools: [product],
        squareMeter: 100,
       // isPaid: false
    }
]
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

    return (<TableRender title={'Serviço'} data={orders} columns={columns}/>);
}

export default OrderListPage;
