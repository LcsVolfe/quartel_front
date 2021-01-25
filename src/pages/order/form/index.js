import React, {useEffect, useState} from 'react';
import typesEnum from "../../../components/form-builder/enum/types.enum";
import {FormBuilder} from "../../../components/form-builder";
import {GatewayOptions, StatusOptions} from "./options";
import OrderLineFormPage from "./order-line";
import validators from "../../../components/form-builder/enum/validators.enum";


const OrderFormPage = () => {

    const [orderLine, setOrderLine] = useState()
    const orderLineForm = (data) => setOrderLine(data)
    const SetOrderLineForm = (data) => setOrderLine(data)
    const TakeFormReference = (data, setFormState) => {
        if(!orderLine) return;
        let grandTotal = 0;
        orderLine.map(line => {
            grandTotal += Number(line.lineAmount);
        })
        setFormState('orderLine', orderLine)
        setFormState('grandTotal', grandTotal)

    }


    let fields = [
        {
            name: 'address',
            type: typesEnum.INVISIBLE
        },
        {
            name: 'client',
            label: 'Cliente',
            type: typesEnum.AUTOCOMPLETE,
            path: 'clients-search-by-name',
            validations: {
                rule: validators.required,
            },
        },
        {
            name: 'name',
            label: 'Nome da Obra',
            type: typesEnum.TEXT,
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
            defaultValue: '0'
        },
        {
            name: 'discount',
            label: 'Desconto',
            type: typesEnum.CURRENCY,
            defaultValue: '0'
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
            defaultValue: '0'
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
            type: typesEnum.MULTISELECT,
            customComponent: <OrderLineFormPage TakeFormReference={orderLineForm} orderState={orderLine} />
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
                    type: typesEnum.NUMBER,
                    defaultValue: 1,

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
                    label: "Quantidade"
                },
            ]
        },
        {
            name: 'employeeLine',
            label: 'Funcionários',
            type: typesEnum.MULTISELECT,
            path: 'employees-search-by-name',

        },
    ];


    return (<FormBuilder controls={fields} title={'Cadastro de Serviço'} TakeFormReference={TakeFormReference}  />);

}

export default OrderFormPage;
