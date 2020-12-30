import MUIDataTable from "mui-datatables";
var products = [
    {
        name: 'Martelo',
        unity: 10,
        qty: 10,
        price: 10,
        epi: false,
        tool: false,
        quartel: false,
        puchaseDate: new Date(),
        cost: 0,
        description: '',
        isSelling: false
    },
    {
        name: 'Chapa',
        unity: 12,
        qty: 12,
        price: 12,
        epi: false,
        tool: false,
        quartel: false,
        puchaseDate: new Date(),
        cost: 0,
        description: '',
        isSelling: false
    }
]

const ProductListPage = () => {
    let columns = [
        {
            name: "name",
            label: "Nome",
        },
        {
            name: "unity",
            label: "Unidade",
        },
        {
            name: "qty",
            label: "Quantidade",
        },
        {
            name: "price",
            label: "Preço",
        },
    ];

    let options = {
        filterType: 'checkbox',
    };



    return (
        <MUIDataTable
            title={"Produto"}
            data={products}
            columns={columns}
            options={options}
        />
    );
}

export default ProductListPage;
