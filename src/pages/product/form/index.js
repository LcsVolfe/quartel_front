import React from 'react';
import typesEnum from "../../../components/form-builder/enum/types.enum";
import {FormBuilder} from "../../../components/form-builder";




const ProductFormPage = () => {

    let fields = [
        {
            name: 'name',
            label: 'Nome',
            type: typesEnum.TEXT,
            defaultValue: '',
            // validations: {
            //     required: validators.required(),
            //     minLength: validators.minLength(3),
            // },
        },
        {
            name: 'price',
            label: 'Preço',
            type: typesEnum.NUMBER,
        },
        {
            name: 'qty',
            label: 'Quantidade',
            type: typesEnum.NUMBER,
        },
        {
            name: 'unity',
            label: 'Unidade',
            type: typesEnum.SELECT,
            options: [
                {label: 'Unídade', value: 0},
                {label: 'Kilo', value: 1},
                {label: 'Metro', value: 2},
            ]
        },
        {
            name: 'puchaseDate',
            label: 'Data Compra',
            type: typesEnum.DATE,
        },
        {
            name: 'description',
            label: 'Descrição',
            type: typesEnum.TEXT,
        },
        {
            name: 'epi',
            label: 'EPI',
            type: typesEnum.BOOLEAN,
        },
        {
            name: 'isSelling',
            label: 'Venda',
            type: typesEnum.BOOLEAN,
            defaultValue: true
        },
        {
            name: 'quartel',
            label: 'Quartel',
            type: typesEnum.BOOLEAN,
        },
        {
            name: 'tool',
            label: 'Ferramenta',
            type: typesEnum.BOOLEAN,
        },
    ];

    return (<FormBuilder controls={fields} title={'Cadastro de Produto'}  />);
}

export default ProductFormPage;
