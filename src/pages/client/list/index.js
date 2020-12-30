import MUIDataTable from "mui-datatables";

var clients = [
    {
        name: 'Gustavo',
        zipcode: '89803270',
        street: 'rua',
        city: 'cidade',
        region: 'estado',
        cpf: '',
        cnpj: '',
        phone: '',
        email: ''
    },
    {
        name: 'Maria',
        zipcode: '89803999',
        street: 'rua',
        city: 'cidade',
        region: 'estado',
        cpf: '',
        cnpj: '',
        phone: '',
        email: ''
    },
]
const ClientListPage = () => {
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

    let options = {
        filterType: 'checkbox',
    };



    return (
        <MUIDataTable
            title={"Cliente"}
            data={clients}
            columns={columns}
            options={options}
        />
    );
}

export default ClientListPage;
