import React from 'react';
import typesEnum from "../../../components/form-builder/enum/types.enum";
import {FormBuilder} from "../../../components/form-builder";
import {GatewayOptions, StatusOptions} from "./options";
import OrderLineFormPage from "./order-line";


const OrderFormPage = () => {



    const TakeFormReference = (data, setFormState) => {
        // console.log(data)
        // setFormState('region', 'xxxxxxx')
    }
    let fields = [
        // {
        //     name: 'xxxxx',
        //     type: typesEnum.MULTISELECT,
        //     customComponent: <OrderLineFormPage TakeFormReference={TakeFormReference} />
        // },
        {
            name: 'address',
            type: typesEnum.INVISIBLE
        },
        {
            name: 'client',
            label: 'Cliente',
            type: typesEnum.AUTOCOMPLETE,
            path: 'clients-search-by-name',
            // validations: {
            //     required: validators.required(),
            //     minLength: validators.minLength(3),
            // },
        },
        {
            name: 'zipcode',
            label: 'CEP',
            type: typesEnum.TEXT,
        },
        {
            name: 'street',
            label: 'Rua',
            type: typesEnum.TEXT,
        },
        {
            name: 'city',
            label: 'Cidade',
            type: typesEnum.TEXT,
        },
        {
            name: 'region',
            label: 'Estado',
            type: typesEnum.TEXT,
        },
        {
            name: 'dateOrdered',
            label: 'Data Início',
            type: typesEnum.DATE,
        },
        {
            name: 'dateFinish',
            label: 'Data Término',
            type: typesEnum.DATE,
            defaultValue: null
        },
        {
            name: 'grandTotal',
            label: 'Total',
            type: typesEnum.CURRENCY,
        },
        {
            name: 'discount',
            label: 'Desconto',
            type: typesEnum.CURRENCY,
        },
        {
            name: 'gateway',
            label: 'Pagamento',
            type: typesEnum.SELECT,
            options: GatewayOptions
        },
        {
            name: 'squareMeter',
            label: 'Mt2',
            type: typesEnum.NUMBER,
        },
        {
            name: 'isPaid',
            label: 'Paga',
            type: typesEnum.BOOLEAN,
        },
        {
            name: 'status',
            label: 'Status',
            type: typesEnum.SELECT,
            options: StatusOptions
        },
        {
            name: 'orderLine',
            label: 'Produtos',
            type: typesEnum.MULTISELECT,
            path: 'products-search-by-isselling',
            additionalFields: [
                {
                    name: 'product',
                    type: typesEnum.INVISIBLE
                },
                {
                    name: 'stock',
                    label: 'Estoque',
                    type: typesEnum.NUMBER,
                    readOnly: true
                },
                {
                    name: 'qty',
                    label: 'Quantidade',
                    type: typesEnum.NUMBER
                },
                {
                    name: 'price',
                    label: 'Preço',
                    type: typesEnum.NUMBER
                },
                {
                    name: 'lineAmount',
                    label: 'Total',
                    type: typesEnum.CURRENCY,
                    readOnly: true
                },

            ],
            columns: [
                {
                    name: "product",
                    label: "ID",
                },
                {
                    name: "name",
                    label: "Nome",
                },
                {
                    name: "price",
                    label: "Preço",
                },
                {
                    name: "qty",
                    label: "Quantidade",
                },
            ]
        },
        {
            name: 'toolLine',
            label: 'Ferramentas',
            type: typesEnum.MULTISELECT,
            path: 'products-search-by-tool',
            additionalFields: [
                {
                    name: 'product',
                    type: typesEnum.INVISIBLE
                },
                {
                    name: 'qty',
                    label: 'Quantidade',
                    type: typesEnum.NUMBER
                },

            ],
            columns: [
                {
                    name: "product",
                    label: "ID",
                },
                {
                    name: "name",
                    label: "Nome",
                },
                {
                    name: "qty",
                    label: "Quantidade",
                },
            ]
        },
        {
            name: 'employeeLine',
            label: 'Funcionários',
            type: typesEnum.MULTISELECT,
            path: 'employees-search-by-name'
        },
    ];

    return (<FormBuilder controls={fields} title={'Cadastro de Serviço'} TakeFormReference={TakeFormReference}  />);

}

export default OrderFormPage;
