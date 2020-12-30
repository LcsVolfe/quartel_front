import React from 'react';
import {Box, Button, Paper, TextareaAutosize, TextField} from "@material-ui/core";
import { useForm } from "react-hook-form";
import Switch from '@material-ui/core/Switch';
// import {
//     MuiPickersUtilsProvider,
//     KeyboardDatePicker,
// } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';


const ProductFormPage = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
    const [state, setState] = React.useState({
        epi: false,
        tool: false,
        quartel: false,
        isSelling: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };


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

    return (
      <Paper>
          <Box p={4}>
              <h1>Formulário de Produto</h1>

              <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField name={'name'} label="Nome" inputRef={register}/>
                  <TextField name={'unity'} type={'number'} label="Unidade" inputRef={register}/>
                  <TextField name={'qty'} type={'number'} label="Quantidade" inputRef={register}/>
                  <TextField name={'cost'} type={'number'} label="Custo" inputRef={register}/>
                  {/*<TextField name={'description'} type={'textarea'} label="Descrição" inputRef={register}/>*/}
                  <TextareaAutosize name='description' placeholder="Descrição"/>
                  {/*<MuiPickersUtilsProvider utils={DateFnsUtils}>*/}
                  {/*    <KeyboardDatePicker*/}
                  {/*        disableToolbar*/}
                  {/*        variant="inline"*/}
                  {/*        format="MM/dd/yyyy"*/}
                  {/*        margin="normal"*/}
                  {/*        id="date-picker-inline"*/}
                  {/*        label="Date picker inline"*/}
                  {/*        value={selectedDate}*/}
                  {/*        onChange={handleDateChange}*/}
                  {/*        KeyboardButtonProps={{*/}
                  {/*            'aria-label': 'change date',*/}
                  {/*        }}*/}
                  {/*    />*/}
                  {/*</MuiPickersUtilsProvider>*/}
                  <Switch
                      inputRef={register}
                      checked={state.epi}
                      onChange={handleChange}
                      name="epi"
                      color="primary"
                  />
                  <Box>
                      <Switch
                          inputRef={register}
                          checked={state.tool}
                          onChange={handleChange}
                          name="tool"
                          color="primary"
                      />
                      <span>Ferramenta</span>
                  </Box>
                  <Button variant="contained" type={'submit'}>Salvar</Button>
              </form>

          </Box>

      </Paper>
    );
}

export default ProductFormPage;

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