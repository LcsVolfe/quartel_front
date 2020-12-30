import React from 'react';
import {Box, Button, Paper, TextareaAutosize, TextField} from "@material-ui/core";
import { useForm } from "react-hook-form";
import Switch from '@material-ui/core/Switch';
// import {
//     MuiPickersUtilsProvider,
//     KeyboardDatePicker,
// } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';


const OrderFormPage = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

    var order = {
        grandTotal: 0,
        discount: 0,
         //lines: [line],
        client: client,
        gateway: 0,
         //dateOrdered: new Date(),
         //dateFinish: new Date(),
        status: 0,
         //tools: [product],
        squareMeter: 0,
         //isPaid: false
    }

    return (
      <Paper>
          <Box p={4}>
              <h1>Formulário da Ordem de Serviço</h1>

              <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField name={'grandtotal'} type={'number'} label="Total Final" inputRef={register}/>
                  <TextField name={'discount'} type={'number'} label="Desconto" inputRef={register}/>
                  <TextField name={'name'} type={'text'} label="Cliente" inputRef={register}/>
                  <TextField name={'gateway'} type={'number'} label="Gateway" inputRef={register}/>
                  <TextField name={'status'} type={'number'} label="Status" inputRef={register}/>
                  <TextField name={'squareMeter'} type={'number'} label="Metro Quadrado" inputRef={register}/>
                  <Button variant="contained" type={'submit'}>Salvar</Button>
              </form>

          </Box>

      </Paper>
    );
}

export default OrderFormPage;

var address = {
    cep: '',
    rua: '',
    cidade: '',
    estado: ''
}


var line = {
    product: product,
    lineAmount: 0,
    qty: 0,
    price: 0
}

var product = {
    name: '',
    unity: 0,
    qty: 0,
    price: 0,
    epi: false,
    tool: false,
    quartel: false,
    puchaseDate: new Date(),
    cost: 0,
    description: '',
    isSelling: false
}

var order = {
    grandTotal: 0,
    discount: 0,
    lines: [line],
    client: client,
    gateway: 0,
    dateOrdered: new Date(),
    dateFinish: new Date(),
    status: 0,
    tools: [product],
    squareMeter: 0,
    isPaid: false
}

var client = {
    name: '',
    address: address,
    cpf: '',
    cnpj: '',
    phone: '',
    email: ''
}