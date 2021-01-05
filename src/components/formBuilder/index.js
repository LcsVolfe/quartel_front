import React from 'react';
import {
    AppBar,
    Box,
    Button, Grid, IconButton,
    makeStyles,
    MenuItem,
    Paper,
    Select,
    TextField, Toolbar
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import Switch from '@material-ui/core/Switch';
import InputMask from 'react-input-mask';
import DateFnsUtils from '@date-io/date-fns';
import { ptBR } from "date-fns/locale";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {Link, useLocation} from "react-router-dom";
import typesEnum from "./types";
import MultiSelectComponent from "./multiSelect";
import axios from "axios";
import ApiService from "../../service";



const FormBuilderComponent = (props) => {
    let location = useLocation();
    const classes = useStyles();
    let fieldsState = {};

    props.fields.forEach(field => {
        if(
            field.type === typesEnum.BOOLEAN ||
            field.type === typesEnum.SELECT ||
            field.type === typesEnum.MULTISELECT ||
            field.defaultValue
        )
            fieldsState[field.name] = field.defaultValue ? field.defaultValue : false;

        if(field.type === typesEnum.DATE)
            fieldsState[field.name] = field.defaultValue ? field.defaultValue : new Date();
    });

    const { register, handleSubmit, control, errors, watch } = useForm({defaultValues: fieldsState});
    const [state, setState] = React.useState(fieldsState);


    const onSubmit = async data => {
        let fullForm = {...state, ...data}
        let result = await ApiService.CreateClient(fullForm);
        console.log(result);
    }
    const multiListUpdate = (data, name) => setState({...state, [name]: data});
    const handleChangeSwitch = (event) => setState({ ...state, [event.target.name]: event.target.checked });
    const handleChangeSelect = (event) => setState({ ...state, [event.target.name]: event.target.value });
    const handleDateChange = (date, value, name) => setState({ ...state, [name]: date });


    return (
        <Paper className={classes.paper}>
            <Box p={4} className={classes.box}>
                <h1>Formulário de Produto</h1>

                <AppBar position="relative" >
                    <Toolbar className={classes.toolBarForm}>
                        <IconButton color="inherit" component={Link} to={location.pathname.replace('form', 'list')}>
                            <ArrowBackIcon />
                        </IconButton>
                        <IconButton color="inherit" onClick={handleSubmit(onSubmit)}>
                            <SaveIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>

                    {props.fields.map((field, index)=>{
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
                                        // onChange={(e) => {
                                        //     console.log(e.target.value);
                                        // }}
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
                                    <Box key={index} className={classes.boolean}>
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

                            case typesEnum.DATE:
                                return (
                                    <MuiPickersUtilsProvider key={index} utils={DateFnsUtils} locale={ptBR}>
                                        <Grid container justify="space-around">
                                            <KeyboardDatePicker
                                                format="dd/MM/yyyy"
                                                label={field.label || field.name}
                                                value={state[field.name]}
                                                onChange={(date, value) => handleDateChange(date, value, field.name)}
                                            />
                                            {/*<KeyboardTimePicker*/}
                                            {/*    margin="normal"*/}
                                            {/*    id="time-picker"*/}
                                            {/*    label="Time picker"*/}
                                            {/*    value={selectedDate}*/}
                                            {/*    onChange={handleDateChange}*/}
                                            {/*    KeyboardButtonProps={{*/}
                                            {/*        'aria-label': 'change time',*/}
                                            {/*    }}*/}
                                            {/*/>*/}
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                );

                            case typesEnum.CPF:
                            case typesEnum.CNPJ:
                            case typesEnum.PHONE:
                            case typesEnum.ZIPCODE:
                            case typesEnum.MASK:
                                let maskPatter =
                                    field.type === typesEnum.CPF ? '999.999.999-99' :
                                    field.type === typesEnum.CNPJ ? '99.999.999/9999-99':
                                    field.type === typesEnum.PHONE ? '(99) 99999-9999':
                                    field.type === typesEnum.ZIPCODE ? '99999-999':
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
        maxWidth: '800px',
        margin: '0 auto',
    },
    box: {
        maxWidth: '750px',
        justifyContent: 'center'
    },
    boolean: {
        order: 1
    },
    toolBarForm: {
        display: 'flex',
        justifyContent: 'space-between'
    },
}));
