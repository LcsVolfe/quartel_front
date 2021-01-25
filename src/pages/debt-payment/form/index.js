import React from 'react';
import {FormBuilder} from "../../../components/form-builder";
import typesEnum from "../../../components/form-builder/enum/types.enum";
import validators from "../../../components/form-builder/enum/validators.enum";
import {GatewayOptions} from "../../order/form/options";

const DebtPaymentFormPage = () => {

    let fields = [
        {
            name: 'provider',
            label: 'Fornecedor',
            type: typesEnum.AUTOCOMPLETE,
            path: 'providers-search-by-name',
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
            name: 'datePay',
            label: 'Pagamento',
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
            options: GatewayOptions
        },
        {
            name: 'description',
            label: 'Descrição',
            type: typesEnum.TEXT,
        },
        {
            name: 'isPaid',
            label: 'Paga',
            type: typesEnum.BOOLEAN,
        },
        {
            name: 'isMonthly',
            label: 'Mensal Fixa',
            type: typesEnum.BOOLEAN,
        }
    ];

    return (<FormBuilder controls={fields} title={'Cadastro de Despesa'}  />);
}

export default DebtPaymentFormPage;
