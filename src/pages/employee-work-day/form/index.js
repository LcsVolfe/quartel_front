import React from 'react';
import {FormBuilder} from "../../../components/form-builder";
import typesEnum from "../../../components/form-builder/enum/types.enum";
import validators from "../../../components/form-builder/enum/validators.enum";
import {PeriodOptions, PeriodOptionsEnum} from "./options";
import {FormatDate} from "../../../utils/date";

const EmployeeWorkDayFormPage = ({TakeFormReference, workDay, selectedEvent}) => {
    let fields = [
        {
            name: 'id',
            type: typesEnum.INVISIBLE
        },
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
            defaultValue: workDay,
            readOnly: !!workDay
        },
        {
            name: 'workNight',
            label: 'Trab. Noite',
            type: typesEnum.BOOLEAN
        },
        {
            name: 'isPaid',
            label: 'Pago',
            type: typesEnum.BOOLEAN
        }
    ];

    const onFormChange = ({state}, setFormState) => {
        // console.log(state)
        if (state?.employee?.dailyValue && Number(state.dailyValue) == 0)
            setFormState('dailyValue', state.employee.dailyValue)
        else if (!state?.employee)
            setFormState('dailyValue', 0)

        if(state.period == PeriodOptionsEnum.NOITE)
            setFormState('workNight', true)

        if(TakeFormReference)
            TakeFormReference(state)
        // setFormState('dailyValue', state.employee.dailyValue)
    }



    return (<FormBuilder controls={fields} initValues={selectedEvent} TakeFormReference={onFormChange} actionBar={false} saveBtn={false} elevation={0} />);
}

export default EmployeeWorkDayFormPage;
