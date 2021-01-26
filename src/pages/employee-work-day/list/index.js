import React from 'react';
import {TableRender} from "../../../components/table-render";
import {DateColumn, MaskColumn, OptionsColumn} from "../../../components/table-render/presentation";
import {PeriodOptions} from "../form/options";

const EmployeeWorkDayListPage = () => {
    let columns = [
        {
            name: "order",
            label: "Nome da Obra",
            options: {customBodyRender: (value)=> value?.name}

        },
        {
            name: "employee",
            label: "Funcionário",
            options: {customBodyRender: (value)=>value?.name}
        },
        {
            name: "dateWork",
            label: "Dia Trabalhado",
            options: {customBodyRender: DateColumn},
        },
        {
            name: "period",
            label: "Periodo",
            options: {customBodyRender: (value)=>OptionsColumn(value, PeriodOptions)},
        },
    ];

    return (
        <>
            <TableRender columns={columns} title={'Dia de Trabalho Funcionários'} />
        </>
    );
}

export default EmployeeWorkDayListPage;
