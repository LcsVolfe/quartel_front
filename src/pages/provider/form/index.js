import React from 'react';
import {FormBuilder} from "../../../components/form-builder";
import typesEnum from "../../../components/form-builder/enum/types.enum";
import validators from "../../../components/form-builder/enum/validators.enum";

const ProviderFormPage = () => {

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
            name: 'phone',
            label: 'Telefone',
            type: typesEnum.PHONE,
        }
    ];

    return (<FormBuilder controls={fields} title={'Cadastro de Fornecedor'}  />);
}

export default ProviderFormPage;
