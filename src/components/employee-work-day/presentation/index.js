import React from 'react';
import {
	Box,
	Container,
	Grid, Tooltip,
} from "@material-ui/core";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import EmployeeWorkDayCalendar from "./components/employee-work-day-calendar";
import PStypesEnum from "../../form-builder/enum/types.enum";
import {FormBuilder} from "../../form-builder";
import TableRender, {CurrencyColumn} from "../../table-render/presentation";
import {FirstDayMonthDatePicker, LastDayMonthDatePicker} from "../../../utils/date";
import ApiService from "../../../service";


const OrderEmployeeToolTip = (value) => (
		<Tooltip title={(
			Object.values(value).map(item => (
				<p>{`${item.name} - R$ ${item.total} - ${item.workDays} dias trabalhado`}</p>
			))
		)}>
			<span>{Object.values(value).length}</span>
		</Tooltip>
	);


const EmployeeWorkDay = ({employeeWorkDay, employeeWorkDayCalculate, handlerCreateNewWorkDay, handlerDeleteWorkDay, handlerCalculateWorkDay }) => {

	const payEmployeeWorkDay = (days) => {
		
		let response = ApiService.CustomRequest('ee', 'PUT', {});
	}


	return (
		<Container maxWidth={false}>
			<Grid container spacing={3}>
				<Grid item lg={12} sm={12} xl={8} xs={12}>
					<EmployeeWorkDayCalendar
						events={employeeWorkDay?.events}
						handlerCreateNewWorkDay={handlerCreateNewWorkDay}
						handlerDeleteWorkDay={handlerDeleteWorkDay}
					/>
				</Grid>
				<Grid item lg={12} sm={12} xl={4} xs={12}>
					<FormBuilder
						title={'Filtros'}
						onClick={handlerCalculateWorkDay}
						actionBar={false}
						btnText={'Filtrar'}
						elevation={0}
						inputFullWidth={true}
						controls={[
							{label: 'Data Início', name: 'startDate', type: PStypesEnum.DATE, defaultValue: FirstDayMonthDatePicker},
							{label: 'Data Fim', name: 'endDate', type: PStypesEnum.DATE, defaultValue: LastDayMonthDatePicker},
							{label: 'Obra', name: 'order', type: PStypesEnum.AUTOCOMPLETE, path: 'orders-search-by-name'},
							{label: 'Funcionário', name: 'employee', type: PStypesEnum.AUTOCOMPLETE, path: 'employees-search-by-name'},
						]}
					/>
					<div>
						<p>Total geral: R$ {employeeWorkDayCalculate?.totalFilter || 0}</p>
						<p>Qntd. obras: {Object.values(employeeWorkDayCalculate?.orders || {})?.length}</p>
						<p>Qntd. funcionários: {Object.values(employeeWorkDayCalculate?.employees || {})?.length}</p>

						{employeeWorkDayCalculate?.employees && <TableRender
							onLoadTable={Object.values(employeeWorkDayCalculate?.employees || {})}
							actionBar={false}
							canDelete={false}
							editAction={false}
							customAction={(id)=>console.log('customAction', id)}
							customActionIcon={<AttachMoneyIcon />}
							customActionLabel={'Pagar todos os dias do funcionario'}
							title={'Dias por funcionário'}
							columns={[
								{name: 'name', label: 'Nome'},
								{name: 'workDays', label: 'Dias Trabalhado'},
								{name: 'total', label: 'Total', options: {customBodyRender: CurrencyColumn}},
							]}
						/>}

						{employeeWorkDayCalculate?.orders && <Box marginTop={2}>
							<TableRender
								onLoadTable={Object.values(employeeWorkDayCalculate?.orders || {})}
								actionBar={false}
								canDelete={false}
								editAction={false}
								customAction={(id)=>console.log('aaaa', id)}
								customActionIcon={<AttachMoneyIcon />}
								customActionLabel={'Pagar todos os dias da obra'}
								title={'Dias por obra'}
								columns={[
									{name: 'name', label: 'Nome'},
									{name: 'workDays', label: 'Dias de funcionáio'},
									{name: 'total', label: 'Total', options: {customBodyRender: CurrencyColumn}},
									{name: 'employees', label: 'Funcionários', options: {customBodyRender: OrderEmployeeToolTip}},
								]}
							/>
						</Box>
						}

					</div>
				</Grid>
			</Grid>
		</Container>
	);
}


export default EmployeeWorkDay;

