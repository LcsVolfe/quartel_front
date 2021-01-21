import React, {useState} from 'react';
import typesEnum from "../../../../components/form-builder/enum/types.enum";
import {FormBuilder} from "../../../../components/form-builder";
import {GatewayOptions, StatusOptions} from "../options";
import FormBuilderPresentation from "../../../../components/form-builder/presentation";
import {CurrencyColumn} from "../../../../components/table-render/presentation";
import validators from "../../../../components/form-builder/enum/validators.enum";


const OrderLineFormPage = ({TakeFormReference, orderState}) => {

    let fields = [
        {
            name: 'orderLine',
            label: 'Produtos',
            type: typesEnum.MULTISELECT,
            path: 'products-search-by-isselling',
            additionalFields: [
                {
                    name: 'product',
                    type: typesEnum.INVISIBLE
                },
                {
                    name: 'stock',
                    label: 'Estoque',
                    type: typesEnum.TEXT,
                    readOnly: true,
                    defaultValue: '0'
                },
                {
                    name: 'qty',
                    label: 'Quantidade',
                    type: typesEnum.NUMBER,
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
                    readOnly: true,
                    defaultValue: '0'
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
                {
                    name: "lineAmount",
                    label: "Total",
                    options: {customBodyRender: CurrencyColumn}
                },
            ],
            defaultValue: orderState
        },
    ];

    const onFormChange = (data, setFormState) => {
        if(data?.autoCompleteValue) {
            // console.log('lineAmount', Number(data.state?.price) * Number(data.watchForm.qty))
            data.state.product = data.autoCompleteValue.id;
            setFormState('stock', data.autoCompleteValue.qty)
            if(!data.state?.price)
                setFormState('price', data.autoCompleteValue.price)
            if(Number(data.watchForm.qty) > Number(data.autoCompleteValue.qty))
                setFormState('qty', Number(data.autoCompleteValue.qty));
            else if(Number(data.watchForm.qty) == 0)
                setFormState('qty', 1);

            setFormState('lineAmount', (Number(data.state?.price) * Number(data.watchForm.qty)) || 0)
            TakeFormReference(data.listData)
        } else {
            setFormState('qty', '0')
            setFormState('stock', 0)
            setFormState('price', 0)
            setFormState('lineAmount', 0)
        }
        if(data?.listData)
            TakeFormReference(data.listData)

    }



    return (<FormBuilder controls={fields} TakeFormReference={onFormChange} actionBar={false} elevation={0} saveBtn={false}  />);
}

export default OrderLineFormPage;
