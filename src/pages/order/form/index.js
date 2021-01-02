import React from 'react';
import {Box, Button, Paper, TextField} from "@material-ui/core";
import { useForm } from "react-hook-form";


const OrderFormPage = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);


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
