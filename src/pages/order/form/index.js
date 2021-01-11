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
            propSearch: 'name'
            // validations: {
            //     required: validators.required(),
            //     minLength: validators.minLength(3),
            // },
        },
        {
            name: 'client2',
            label: 'Cliente2',
            type: typesEnum.AUTOCOMPLETE,
            path: 'clients-search-by-another-thing'
            // validations: {
            //     required: validators.required(),
            //     minLength: validators.minLength(3),
            // },
        },
        {
            name: 'address',
            label: 'Endereço',
            type: typesEnum.TEXT,
        },
        {
            name: 'dateOrdered',
            label: 'Data Início',
            type: typesEnum.DATE,
        },
        {
            name: 'dateFinish',
            label: 'Data Início',
            type: typesEnum.DATE,
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
        },
        {
            name: 'orderLine',
            label: 'Produtos',
            type: typesEnum.MULTISELECT,
        },
        {
            name: 'toolLine',
            label: 'Ferramentas',
            type: typesEnum.MULTISELECT,
        },
        {
            name: 'employeeLine',
            label: 'Funcionários',
            type: typesEnum.MULTISELECT,
        },
    ];

    return (<FormBuilder controls={fields} title={'Cadastro de Serviço'}  />);
}

export default OrderFormPage;
