import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
	Container,

	Grid,
} from "@material-ui/core";
import Budget from "./components/budget";
import TotalCustomers from "./components/total-customers";
import TasksProgress from "./components/task-progress";
import TotalProfit from "./components/total-profit";
import LowStockProducts from "./components/low-stock-products";
import DebtsCalendar from "./components/debts-calendar";

const Dashborad = ({loading, onClick, dashboard, handlerDebtDatePay }) => {
	return (
		<Container maxWidth={false}>
			<Grid container spacing={3}>
				<Grid item lg={3} sm={6} xl={3} xs={12}>
					<LowStockProducts data={dashboard?.products} />
				</Grid>
				<Grid item lg={4} sm={6} xl={4} xs={12}>
					<DebtsCalendar handlerDebtDatePay={handlerDebtDatePay} events={dashboard?.debtPayments}/>
				</Grid>
				{/*<Grid item lg={3} sm={6} xl={3} xs={12}>*/}
				{/*	<Budget />*/}
				{/*</Grid>*/}
				{/*<Grid item lg={3} sm={6} xl={3} xs={12}>*/}
				{/*	<TotalCustomers />*/}
				{/*</Grid>*/}
				{/*<Grid item lg={3} sm={6} xl={3} xs={12}>*/}
				{/*	<TasksProgress />*/}
				{/*</Grid>*/}
				{/*<Grid item lg={3} sm={6} xl={3} xs={12}>*/}
				{/*	<TotalProfit />*/}
				{/*</Grid>*/}
				{/*<Grid*/}
				{/*	item*/}
				{/*	lg={8}*/}
				{/*	md={12}*/}
				{/*	xl={9}*/}
				{/*	xs={12}*/}
				{/*>*/}
				{/*	<Sales />*/}
				{/*</Grid>*/}
			</Grid>
		</Container>
	);
}


Dashborad.propTypes = {
	word: PropTypes.string,
	onClick: PropTypes.func,
	loading: PropTypes.bool,
};

export default Dashborad;

