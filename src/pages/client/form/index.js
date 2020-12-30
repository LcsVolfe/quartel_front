import React from 'react';
import {Box, Button, Paper, TextareaAutosize, TextField} from "@material-ui/core";
import { useForm } from "react-hook-form";
import Switch from '@material-ui/core/Switch';
// import {
//     MuiPickersUtilsProvider,
//     KeyboardDatePicker,
// } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';


const ClientFormPage = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);


    return (
      <Paper>
          <Box p={4}>
              <h1>Formulário do Cliente</h1>

              <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField name={'name'} label="Nome" inputRef={register}/>
                  <TextField name={'zipcode'} type={'text'} label="Cep" inputRef={register}/>
                  <TextField name={'street'} type={'text'} label="Rua" inputRef={register}/>
                  <TextField name={'city'} type={'text'} label="Cidade" inputRef={register}/>
                  <TextField name={'region'} type={'text'} label="Estado" inputRef={register}/>
                  <TextField name={'cpf'} type={'text'} label="Cpf" inputRef={register}/>
                  <TextField name={'cnpj'} type={'text'} label="Cnpj" inputRef={register}/>
                  <TextField name={'phone'} type={'text'} label="Telefone" inputRef={register}/>
                  <TextField name={'email'} type={'email'} label="Email" inputRef={register}/>

                  <Button variant="contained" type={'submit'}>Salvar</Button>
              </form>

          </Box>

      </Paper>
    );
}

export default ClientFormPage;

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