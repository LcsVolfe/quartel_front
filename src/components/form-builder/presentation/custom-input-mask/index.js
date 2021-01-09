import typesEnum from "../../enum/types.enum";
import React from "react";
import TextField from "@material-ui/core/TextField";
import InputMask from "react-input-mask";



const CustomInputMask = (props, errors) => {

    let maskPatter =
        props.field.type == typesEnum.CPF ? '999.999.999-99' :
            props.field.type == typesEnum.CNPJ ? '99.999.999/9999-99':
                props.field.type == typesEnum.PHONE ? '(99) 99999-9999':
                    props.field.type == typesEnum.ZIPCODE ? '99999-999': props.field?.mask;

    return (
        <InputMask mask={maskPatter}>
            {() => (
                <TextField
                    error={!!errors[props.field.name]}
                    name={props.field.name}
                    label={props.field.label ||props.field.name}
                    helperText={errors[props.field.name]?.message}
                />
            )}
        </InputMask>
    );
}




export default CustomInputMask;
