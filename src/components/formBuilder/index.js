import React from 'react';
import {
    Box,
    Button,
    makeStyles,
    MenuItem,
    Paper,
    Select,
    TextField
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import Switch from '@material-ui/core/Switch';
import InputMask from 'react-input-mask';
import typesEnum from "./types";
import MultiSelectComponent from "./multiSelect";
import fields from "./fields";
// import {
//     MuiPickersUtilsProvider,
//     KeyboardDatePicker,
// } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';



const FormBuilderComponent = () => {
    const classes = useStyles();
    let fieldsState = {};

    fields.forEach(field => {
        if(
            field.type === typesEnum.BOOLEAN ||
            field.type === typesEnum.SELECT ||
            field.type === typesEnum.MULTISELECT ||
            field.defaultValue
        ){
            fieldsState[field.name] = field.defaultValue ? field.defaultValue : false;
        }
    });

    const { register, handleSubmit, control, errors } = useForm({defaultValues: fieldsState});
    const [state, setState] = React.useState(fieldsState);


    // continuar incremento dinamico do component multiselct no estado do form
    const onSubmit = data => {
        console.log(state);
        console.log(data);
    }
    const multiListUpdate = (data, name) => setState({...state, [name]: data});

    const handleChangeSwitch = (event) => setState({ ...state, [event.target.name]: event.target.checked });
    const handleChangeSelect = (event) => setState({ ...state, [event.target.name]: event.target.value });

    // const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    //
    // const handleDateChange = (date) => {
    //     setSelectedDate(date);
    // };


    return (
        <Paper className={classes.paper}>
            <Box p={4} className={classes.box}>
                <h1>Formulário de Produto</h1>

                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>

                    {fields.map((field, index)=>{
                        switch (field.type) {
                            case typesEnum.TEXT:
                            case typesEnum.NUMBER:
                            case typesEnum.PASSWORD:
                            case typesEnum.EMAIL:
                                return (
                                    <TextField
                                        key={index}
                                        name={field.name}
                                        error={!!errors[field.name]}
                                        label={field.label || field.name}
                                        type={field.type}
                                        inputRef={register(field.validations)}
                                        helperText={errors[field.name]?.message}
                                        onChange={(e) => {
                                            console.log(e.target.value);
                                        }}
                                    />
                                );

                            case typesEnum.SELECT:
                                return (
                                    <Controller
                                        key={index}
                                        as={
                                            <Select
                                                onChange={handleChangeSelect}
                                            >
                                                {field.options.map((item, i) => {
                                                    return (<MenuItem key={i} value={item.value}>{item.label}</MenuItem>)
                                                })}
                                            </Select>
                                        }
                                        control={control}
                                        name={field.name}
                                    />
                                );

                            case typesEnum.BOOLEAN:
                                return (
                                    <Box key={index}>
                                        <Switch
                                            inputRef={register}
                                            checked={state[field.name]}
                                            onChange={handleChangeSwitch}
                                            name={field.name}
                                            color="primary"
                                        />
                                        <span>{field.label}</span>
                                    </Box>
                                );

                            case typesEnum.MULTISELECT:
                                return (<MultiSelectComponent {...field} key={index} onResult={multiListUpdate}  />);

                            case typesEnum.CPF:
                            case typesEnum.CNPJ:
                            case typesEnum.MASK:
                                let maskPatter =
                                    field.type === typesEnum.CPF ? '999.999.999-99' :
                                    field.type === typesEnum.CNPJ ? '99.999.999/9999-99':
                                        field?.mask
                                return (
                                    <Controller
                                        key={index}
                                        as={
                                            <InputMask mask={maskPatter}>
                                                {() => (
                                                    <TextField
                                                        error={!!errors[field.name]}
                                                        name={field.name}
                                                        label={field.label ||field.name}
                                                        helperText={errors[field.name]?.message}
                                                    />
                                                )}
                                            </InputMask>
                                        }
                                        control={control}
                                        name={field.name}
                                        rules={{validate: (value) => field?.validations?.rule ? field.validations.rule(value) : null}}
                                    />
                                );

                            default:
                                return <span key={field.name}>Elemento não encontrado. {field.name}</span>
                        }
                    })}











                    {/*<TextField name={'description'} type={'textarea'} label="Descrição" inputRef={register}/>*/}
                    {/*<TextareaAutosize name='description' placeholder="Descrição"/>*/}
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
                    {/*<Switch*/}
                    {/*    inputRef={register}*/}
                    {/*    checked={state.epi}*/}
                    {/*    onChange={handleChange}*/}
                    {/*    name="epi"*/}
                    {/*    color="primary"*/}
                    {/*/>*/}

                    <Box>
                        <Button variant="contained" type={'submit'}>Salvar</Button>
                    </Box>
                </form>

            </Box>
        </Paper>
    );
}

export default FormBuilderComponent;


const useStyles = makeStyles((theme) => ({
    form: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'baseline'
    },
    paper: {
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '1080px'
    },
    box: {
        maxWidth: '910px',
        justifyContent: 'center'
    }
}));
