import React, {useEffect, useState} from 'react';
import typesEnum from "../../../components/form-builder/enum/types.enum";
import {FormBuilder} from "../../../components/form-builder";
import {GatewayOptions, StatusOptions} from "./options";
import OrderLineFormPage from "./order-line";
import validators from "../../../components/form-builder/enum/validators.enum";
import ActionEnum from "../../../components/form-builder/enum/action.enum";
import {Dialog, DialogContent, DialogContentText, DialogTitle, Grid,} from "@material-ui/core";
import ApiService from "../../../service";
import {useDispatch} from "react-redux";
import {finishOnPromisse, loadingOnPromisse} from "../../../components/template/action-creators";

const closeOrder = async (id, dispatch) => {
    try {
        const res = await ApiService.CustomRequest(`close-order/${id}`, 'POST', {},dispatch)
        if(res.status != 200) return;
        return res.data;
    } catch (err) {
        return err
    }
};

const SimpleDialog = ({ onClose, open, id }) => {
    const dispatch = useDispatch();
    const [state, setState] = useState();

    useEffect(async ()=>{
        setState(await closeOrder(id, dispatch));
    },[])

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Fechamento Ordem</DialogTitle>
            <DialogContent>
                <DialogContentText>Total Material: R$ {state?.lineTotal}</DialogContentText>
                <DialogContentText>Total Mão de Obra: R$ {state?.employeeTotal}</DialogContentText>
                <DialogContentText>Custo Total: R$ {state?.costTotal}</DialogContentText>
                <DialogContentText>Valor Cobrado: R$ {state?.grandTotal}</DialogContentText>
                <DialogContentText>Lucro: R$ {state?.profit}</DialogContentText>
            </DialogContent>
        </Dialog>
    );
}


const OrderFormPage = () => {
    const [orderLine, setOrderLine] = useState();
    const [open, setOpen] = useState(false);
    const [id, setId] = useState();
    const orderLineForm = (data) => setOrderLine(data)
    const handleClose = () => setOpen(false);
    const TakeFormReference = (data, setFormState) => {
        if(data.state?.id)
            setId(data.state.id);

        if(!orderLine) return;
        let linesTotal = 0;
        orderLine.map(line => {
            linesTotal += Number(line.lineAmount);
        });

        setFormState('orderLine', orderLine)
        setFormState('lineTotal', linesTotal)
        // setFormState('grandTotal', linesTotal + Number(data.state.grandTotal))
    }

    const closeOrder = (itemId) => {
        setOpen(true);
        console.log('chamo meu action', itemId)
    }




    let fields = [
        {
            name: 'address',
            type: typesEnum.INVISIBLE
        },
        {
            name: 'client',
            label: 'Cliente',
            type: typesEnum.AUTOCOMPLETE,
            path: 'clients-search-by-name',
            validations: {
                rule: validators.required,
            },
        },
        {
            name: 'name',
            label: 'Nome da Obra',
            type: typesEnum.TEXT,
        },
        {
            name: 'zipcode',
            label: 'CEP',
            type: typesEnum.TEXT,
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
            name: 'dateOrdered',
            label: 'Data Início',
            type: typesEnum.DATE,
        },
        {
            name: 'dateFinish',
            label: 'Data Término',
            type: typesEnum.DATE,
            defaultValue: null
        },
        {
            name: 'grandTotal',
            label: 'Total',
            type: typesEnum.CURRENCY,
            defaultValue: '0'
        },
        // {
        //     name: 'lineTotal',
        //     label: 'Total Produtos',
        //     type: typesEnum.CURRENCY,
        //     readOnly: true
        // },
        {
            name: 'discount',
            label: 'Desconto',
            type: typesEnum.CURRENCY,
            defaultValue: '0'
        },
        // {
        //     name: 'profit',
        //     label: 'Lucro',
        //     type: typesEnum.CURRENCY,
        //     defaultValue: '0'
        // },
        {
            name: 'gateway',
            label: 'Pagamento',
            type: typesEnum.SELECT,
            options: GatewayOptions
        },
        {
            name: 'squareMeter',
            label: 'Mt2',
            type: typesEnum.NUMBER,
            defaultValue: '0'
        },
        {
            name: 'status',
            label: 'Status',
            type: typesEnum.SELECT,
            options: StatusOptions
        },
        {
            name: 'isPaid',
            label: 'Paga',
            type: typesEnum.BOOLEAN,
        },
        {
            name: 'orderLine',
            type: typesEnum.MULTISELECT,
            customComponent: <OrderLineFormPage TakeFormReference={orderLineForm} orderState={orderLine} />
        },
        {
            name: 'toolLine',
            label: 'Ferramentas',
            type: typesEnum.MULTISELECT,
            path: 'products-search-by-tool',
            additionalFields: [
                {
                    name: 'product',
                    type: typesEnum.INVISIBLE
                },
                {
                    name: 'qty',
                    label: 'Quantidade',
                    type: typesEnum.NUMBER,
                    defaultValue: 1,

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
                    name: "qty",
                    label: "Quantidade"
                },
            ]
        },
        // {
        //     name: 'employeeLine',
        //     label: 'Funcionários',
        //     type: typesEnum.MULTISELECT,
        //     path: 'employees-search-by-name',
        //
        // },
    ];


    return (
        <Grid >
            <FormBuilder controls={fields} title={'Cadastro de Serviço'} TakeFormReference={TakeFormReference} actionBar={[
                {name: ActionEnum.CLOSE_ORDER, action: closeOrder}
            ]} />
            {id && <SimpleDialog open={open} onClose={handleClose} id={id}/>}
        </Grid>
        );

}

export default OrderFormPage;
