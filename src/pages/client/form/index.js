import React from 'react';
import {FormBuilder} from "../../../components/form-builder";
import typesEnum from "../../../components/form-builder/enum/types.enum";
import ApiService from "../../../service";


const ClientFormPage = () => {

    let fields = [
        {
            name: 'name',
            label: 'Nome',
            type: typesEnum.TEXT,
            defaultValue: 'XXXXXXX',
            // validations: {
            //     required: validators.required(),
            //     minLength: validators.minLength(3),
            // },
        },
        {
            name: 'zipcode',
            label: 'CEP',
            type: typesEnum.ZIPCODE,
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
            name: 'cpf',
            label: 'CPF',
            type: typesEnum.CPF,
        },
        {
            name: 'cnpj',
            label: 'CNPJ',
            type: typesEnum.CNPJ,
        },
        {
            name: 'phone',
            label: 'Telefone',
            type: typesEnum.PHONE,
        },
        {
            name: 'email',
            label: 'Email',
            type: typesEnum.EMAIL,
        },
    ];

    return (<FormBuilder controls={fields} title={'Cadastro de Cliente'} onSubmit={ApiService.Create}  />);
}

export default ClientFormPage;
