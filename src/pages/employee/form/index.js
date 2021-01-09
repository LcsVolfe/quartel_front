import React from 'react';
import {FormBuilder} from "../../../components/form-builder";
import typesEnum from "../../../components/form-builder/enum/types.enum";

const EmployeeFormPage = () => {

    let fields = [
        {
            name: 'name',
            label: 'Nome',
            type: typesEnum.TEXT,
            // validations: {
            //     required: validators.required(),
            //     minLength: validators.minLength(3),
            // },
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
