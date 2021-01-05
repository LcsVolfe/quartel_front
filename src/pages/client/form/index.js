import React from 'react';
import typesEnum from "../../../components/formBuilder/types";
import validators from "../../../components/formBuilder/validations";
import FormBuilderComponent from "../../../components/formBuilder";


const ClientFormPage = () => {

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
        }
    ];

    return (<FormBuilderComponent fields={fields}  />);
}

export default ClientFormPage;
