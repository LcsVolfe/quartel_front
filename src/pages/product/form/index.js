import React from 'react';
import {Box, Button, makeStyles, Paper, TextField} from "@material-ui/core";
import { useForm } from "react-hook-form";


const useStyles = makeStyles((theme) => ({
    form: {
        maxWidth: '1280px',
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    box: {
        maxWidth: '910px',
        justifyContent: 'center'
    }
}));


const ProductFormPage = () => {
    const classes = useStyles();
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);


    return (
      <Paper>
          <Box p={4} className={classes.box}>
              <h1>Formulário de Produto</h1>

              <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                  <TextField name={'name'} label="Nome" inputRef={register}/>
                  <TextField name={'unity'} type={'number'} label="Unidade" inputRef={register}/>
                  <TextField name={'qty'} type={'number'} label="Quantidade" inputRef={register}/>
                  <TextField name={'cost'} type={'number'} label="Custo" inputRef={register}/>
                  <TextField name={'cost'} type={'number'} label="Custo" inputRef={register}/>
                  <TextField name={'cost'} type={'number'} label="Custo" inputRef={register}/>
                  <TextField name={'cost'} type={'number'} label="Custo" inputRef={register}/>
                  <TextField name={'cost'} type={'number'} label="Custo" inputRef={register}/>
                  <TextField name={'cost'} type={'number'} label="Custo" inputRef={register}/>
                  <TextField name={'cost'} type={'number'} label="Custo" inputRef={register}/>
                  <TextField name={'cost'} type={'number'} label="Custo" inputRef={register}/>
                  <TextField name={'cost'} type={'number'} label="Custo" inputRef={register}/>
                  <TextField name={'cost'} type={'number'} label="Custo" inputRef={register}/>
                  <TextField name={'cost'} type={'number'} label="Custo" inputRef={register}/>
                  <TextField name={'cost'} type={'number'} label="Custo" inputRef={register}/>
                  <TextField name={'cost'} type={'number'} label="Custo" inputRef={register}/>
                  <TextField name={'cost'} type={'number'} label="Custo" inputRef={register}/>
                  <Box>
                      <Button variant="contained" type={'submit'}>Salvar</Button>
                  </Box>
              </form>

         </Box>
      </Paper>
    );
}

export default ProductFormPage;
