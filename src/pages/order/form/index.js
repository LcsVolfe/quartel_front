import React from 'react';
import typesEnum from "../../../components/form-builder/enum/types.enum";
import {FormBuilder} from "../../../components/form-builder";


const OrderFormPage = () => {

    let fields = [
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
            type: typesEnum.NUMBER,
        },
        {
            name: 'discount',
            label: 'Desconto',
            type: typesEnum.NUMBER,
        },
        {
            name: 'gateway',
            label: 'Pagamento',
            type: typesEnum.SELECT,
            options: [
                {
                    label: 'Dinheiro',
                    value: 0
                },
                {
                    label: 'Cartão',
                    value: 1
                },
                {
                    label: 'Boleto',
                    value: 2
                }
            ]
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
            options: [
                {
                    label: 'Orçamento',
                    value: 0
                },
                {
                    label: 'Em Andamento',
                    value: 1
                },
                {
                    label: 'Fechada',
                    value: 2
                }
            ]
        },
        {
            name: 'orderLine',
            label: 'Produtos',
            type: typesEnum.MULTISELECT,
            path: 'products-search-by-isselling',
            additionalFields: [
                {
                    name: 'qty',
                    label: 'Quantidade',
                    type: typesEnum.NUMBER
                },
                {
                    name: 'lineAmount',
                    label: 'Quantidade',
                    type: typesEnum.CURRENCY,
                    readOnly: true
                },
                {
                    name: 'price',
                    label: 'Quantidade',
                    type: typesEnum.NUMBER
                },

            ]
        },
        {
            name: 'toolLine',
            label: 'Ferramentas',
            type: typesEnum.MULTISELECT,
            path: 'products-search-by-tool'
        },
        {
            name: 'employeeLine',
            label: 'Funcionários',
            type: typesEnum.MULTISELECT,
            path: 'employees-search-by-name'
        },
    ];

    return (<FormBuilder controls={fields} title={'Cadastro de Serviço'}  />);
}

export default OrderFormPage;
