import React from 'react';
import {FormBuilder} from "../../../components/form-builder";
import typesEnum from "../../../components/form-builder/enum/types.enum";
import validators from "../../../components/form-builder/enum/validators.enum";
import {PeriodOptions, PeriodOptionsEnum} from "./options";

const EmployeeWorkDayFormPage = () => {

    let fields = [
        {
            name: 'order',
            label: 'Obra',
            type: typesEnum.AUTOCOMPLETE,
            path: 'orders-search-by-name',
            validations: {
                required: validators.required(),
            },
        },
        {
            name: 'employee',
            label: 'Funcionário',
            path: 'employees-search-by-name',
            type: typesEnum.AUTOCOMPLETE,
            validations: {
                required: validators.required(),
            },
        },
        {
            name: 'dailyValue',
            label: 'Valor Dia',
            type: typesEnum.CURRENCY,
        },
        {
            name: 'period',
            label: 'Periodo',
            type: typesEnum.SELECT,
            options: PeriodOptions,
            defaultValue: 0
        },
        {
            name: 'dateWork',
            label: 'Dia Trabalhado',
            type: typesEnum.DATE,
        },
        {
            name: 'workNight',
            label: 'Trab. Noite',
            type: typesEnum.BOOLEAN
        }
    ];

    const TakeFormReference = ({state}, setFormState) => {
        // console.log(state)
        if (state?.employee?.dailyValue && Number(state.dailyValue) == 0)
            setFormState('dailyValue', state.employee.dailyValue)
        else if (!state?.employee)
            setFormState('dailyValue', 0)

        if(state.period == PeriodOptionsEnum.NOITE)
            setFormState('workNight', true)


        // setFormState('dailyValue', state.employee.dailyValue)
    }

    return (<FormBuilder controls={fields} title={'Cadastro de Funcionário'} TakeFormReference={TakeFormReference}  />);
}

export default EmployeeWorkDayFormPage;
