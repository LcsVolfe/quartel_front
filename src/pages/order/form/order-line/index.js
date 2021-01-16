import React, {useState} from 'react';
import typesEnum from "../../../../components/form-builder/enum/types.enum";
import {FormBuilder} from "../../../../components/form-builder";
import {GatewayOptions, StatusOptions} from "../options";
import FormBuilderPresentation from "../../../../components/form-builder/presentation";
import {CurrencyColumn} from "../../../../components/table-render/presentation";


const OrderLineFormPage = ({TakeFormReference}) => {

    let fields = [
        {
            name: 'product',
            label: 'Produtos',
            type: typesEnum.MULTISELECT,
            path: 'products-search-by-isselling',
            additionalFields: [
                {
                    name: '',
                    label: 'Estoque',
                    type: typesEnum.NUMBER,
                    readOnly: true
                },
                {
                    name: 'qty',
                    label: 'Quantidade',
                    type: typesEnum.NUMBER
                },
                {
                    name: 'price',
                    label: 'Preço',
                    type: typesEnum.CURRENCY
                },
                {
                    name: 'lineAmount',
                    label: 'Total',
                    type: typesEnum.CURRENCY,
                    readOnly: true
                },
            ],
            columns: [
                {
                    name: "product",
                    label: "ID",
                },
                {
                    name: "name",
                    label: "Nome",
                },
                {
                    name: "price",
                    label: "Preço",
                    options: {customBodyRender: CurrencyColumn}
                },
                {
                    name: "qty",
                    label: "Quantidade",
                },
            ]
        },
    ];

    const onFormChange = (data, setFormState) => {
        let {price, qty, autoCompleteValue} = data

        let lineAmount = Number(price?.replaceAll(' ', '').replace(',', '.')) * Number(qty) || 0;
        // console.log( Number(price.replace(',','.')) * Number(qty))
        console.log( price , Number(qty))

        // if(data.lineAmount != lineAmount)
        setFormState('lineAmount', lineAmount)

        //
        // console.log(data)
        // console.log(lineAmount)
        // setAutoCompleteOpen(data)
        // console.log(data, setFormState)
        // console.log(data)
        // if (price != '100' && price)
        //     setFormState('lineamount', '100')
        // TakeFormReference('SAIU DE ORDELINE PARA FORM')
    }



    return (<FormBuilder controls={fields} TakeFormReference={onFormChange} actionBar={false} elevation={0} saveBtn={false}  />);
}

export default OrderLineFormPage;
