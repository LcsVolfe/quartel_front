import React from 'react';
import {FormBuilder} from "../../../components/form-builder";
import typesEnum from "../../../components/form-builder/enum/types.enum";
import validators from "../../../components/form-builder/enum/validators.enum";

const EmployeeFormPage = () => {

    let fields = [
        {
            name: 'name',
            label: 'Nome',
            type: typesEnum.TEXT,
            validations: {
                required: validators.required(),
            },
        },
        {
            name: 'dailyValue',
            label: 'Valor Dia',
            type: typesEnum.CURRENCY,
        },
        {
            name: 'cpf',
            label: 'CPF',
            type: typesEnum.CPF,
        },
        {
            name: 'phone',
            label: 'Telefone',
            type: typesEnum.PHONE,
        }
    ];

    return (<FormBuilder controls={fields} title={'Cadastro de Funcionário'}  />);
}

export default EmployeeFormPage;
