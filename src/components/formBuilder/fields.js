import typesEnum from "./types";
import validators from "./validations";

const fields = [
    {
        name: 'string',
        label: 'STRING',
        type: typesEnum.TEXT,
        // defaultValue: 'valor inicial',
        // validations: {
        //     required: validators.required(),
        //     minLength: validators.minLength(3),
        // },
    },
    {
        name: 'number',
        label: 'NUMBER',
        type: typesEnum.NUMBER,
        defaultValue: 999
    },
    {
        name: 'switch',
        label: 'SWITCH',
        type: typesEnum.BOOLEAN
    },
    {
        name: 'defaultValue',
        label: 'defaultValue',
        type: typesEnum.BOOLEAN,
        defaultValue: true
    },
    {
        name: 'select22',
        label: 'SELECT',
        type: typesEnum.SELECT,
        defaultValue: 2,
        options: [
            {
                label: 'i1',
                value: 1
            },
            {
                label: 'i2',
                value: 2
            },
            {
                label: 'i3',
                value: 3
            }
        ]
    },
    {
        name: 'cpf',
        label: 'Cpf',
        type: typesEnum.CPF,
        // validations: {
        //     rule: validators.cpf,
        // },
    },
    {
        name: 'mask',
        label: 'mask',
        type: typesEnum.MASK,
        mask: '99999-999'
    },
    // {
    //     name: 'multiSelect',
    //     label: 'multi select',
    //     type: typesEnum.MULTISELECT,
    // },
    // {
    //     name: 'multiSelect2',
    //     label: 'multi select2',
    //     type: typesEnum.MULTISELECT,
    // },
    {
        name: 'datepicker',
        label: 'Date picker',
        type: typesEnum.DATE,
    },
];

export default fields;
