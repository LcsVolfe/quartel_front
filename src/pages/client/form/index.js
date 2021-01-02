import React from 'react';
import {Box, Button, Paper, TextField} from "@material-ui/core";
import { useForm } from "react-hook-form";


const ClientFormPage = () => {
    const { register, handleSubmit} = useForm();
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
