import React from 'react';
import {FormBuilder} from "../../../components/form-builder";
import typesEnum from "../../../components/form-builder/enum/types.enum";
import validators from "../../../components/form-builder/enum/validators.enum";
import {GatewayOptions} from "../../order/form/options";

const DebtReceiveFormPage = () => {

    let fields = [
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
            name: 'amount',
            label: 'Total',
            type: typesEnum.CURRENCY,
            validations: {
                rule: validators.required,
            },
        },
        {
            name: 'dateDue',
            label: 'Vencimento',
            type: typesEnum.DATE,
            validations: {
                rule: validators.required,
            },
        },
        {
            name: 'dateReceive',
            label: 'Recebido',
            type: typesEnum.DATE,
            defaultValue: null
        },
        {
            name: 'documentNumber',
            label: 'N. Documento',
            type: typesEnum.TEXT,
        },
        {
            name: 'gateway',
            label: 'Forma Pagamento',
            type: typesEnum.SELECT,
            options: GatewayOptions,
            defaultValue: 0
        },
        {
            name: 'description',
            label: 'Descrição',
            type: typesEnum.TEXT,
        },
        {
            name: 'isReceive',
            label: 'Recebida',
            type: typesEnum.BOOLEAN,
        },
        {
            name: 'isMonthly',
            label: 'Mensal Fixa',
            type: typesEnum.BOOLEAN,
        },
        // {
        //     name: 'pdf',
        //     label: 'Boleto',
        //     type: typesEnum.DROPZONE,
        // }
    ];

    return (<FormBuilder controls={fields} title={'Cadastro de recebíveis'}  />);
}

export default DebtReceiveFormPage;
