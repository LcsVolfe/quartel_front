import React, {useState} from 'react';
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
import TotalProfit from "../../shared/total-profit";
import Budget from "../../shared/budget";


const OrderEmployeeToolTip = (value) => (
		<Tooltip title={(
			Object.values(value).map(item => (
				<p>{`${item.name} - R$ ${item.total} - ${item.workDays} dias trabalhado`}</p>
			))
		)}>
			<span>{Object.values(value).length}</span>
		</Tooltip>
	);


const EmployeeWorkDay = ({employeeWorkDay, employeeWorkDayCalculate, handlerCreateUpdateWorkDay, handlerDeleteWorkDay,
							 handlerCalculateWorkDay, executePaymentWorkDays }) => {
	const [filters, setFilters] = useState();
	const payEmployeeWorkDay = async (ids, selectedRows) =>{
		for await (let row of selectedRows) {
			executePaymentWorkDays(row.workDaysIds, filters)
		}
	}

	const calculateWorkDay = (data) => {
		handlerCalculateWorkDay(data);
		setFilters(data);
	}

	return (
		<Container maxWidth={false}>
			<Grid container spacing={3}>
				<Grid item lg={12} sm={12} xl={8} xs={12}>
					<EmployeeWorkDayCalendar
						events={employeeWorkDay?.events}
						handlerCreateUpdateWorkDay={handlerCreateUpdateWorkDay}
						handlerDeleteWorkDay={handlerDeleteWorkDay}
					/>
				</Grid>
				<Grid item lg={12} sm={12} xl={4} xs={12}>
					<FormBuilder
						title={'Filtros'}
						onClick={calculateWorkDay}
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
					<Box mt={3} mb={3}>
						<Box mb={3}>
							<Grid container spacing={3}>
								<Grid item xs={4}>
									<TotalProfit label={'Total geral'} value={employeeWorkDayCalculate?.totalFilter} />
								</Grid>
								<Grid item xs={4}>
									<Budget label={'Qntd. obras'} footer={''} value={Object.values(employeeWorkDayCalculate?.orders || {})?.length} />
								</Grid>
								<Grid item xs={4}>
									<Budget label={'Qntd. funcionários'} value={Object.values(employeeWorkDayCalculate?.employees || {})?.length} />
								</Grid>
							</Grid>
						</Box>

						{employeeWorkDayCalculate?.employees && <TableRender
							onLoadTable={Object.values(employeeWorkDayCalculate?.employees || {})}
							actionBar={false}
							canDelete={false}
							editAction={false}
							customAction={(ids, selectedRows)=>payEmployeeWorkDay(ids, selectedRows)}
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
								customAction={(ids, selectedRows)=>payEmployeeWorkDay(ids, selectedRows)}
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

					</Box>
				</Grid>
			</Grid>
		</Container>
	);
}


export default EmployeeWorkDay;

