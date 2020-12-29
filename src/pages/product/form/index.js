import {Box, Button, Paper, TextField} from "@material-ui/core";
import { useForm } from "react-hook-form";

const ProductFormPage = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

    return (
      <Paper>
          <Box p={4}>
              <h1>Formulário de Produto</h1>

              <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField name={'nome'} label="Nome" inputRef={register}/>
                  <TextField name={'quantidade'} type={'number'} label="Quantidade" variant="outlined" inputRef={register}/>
                  <TextField inputRef={register} label="First name" name="FirstName"/>
                  <Button variant="contained" type={'submit'}>Salvar</Button>
              </form>

          </Box>

      </Paper>
    );
}

export default ProductFormPage;
