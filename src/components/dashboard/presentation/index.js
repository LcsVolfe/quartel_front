import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
	Container,

	Grid,
} from "@material-ui/core";
import LowStockProducts from "./components/low-stock-products";
import DebtsCalendar from "./components/debts-calendar";
import Budget from "./components/budget";
import TasksProgress from "./components/task-progress";
import TotalCustomers from "./components/total-customers";
import TotalProfit from "./components/total-profit";

const Dashborad = ({loading, onClick, dashboard, handlerDebtDatePay }) => {
	return (
		<Container maxWidth={false}>
			<Grid container spacing={3}>
				{dashboard?.products.length > 0 && (<Grid item lg={3} sm={4} xl={3} xs={12}>
					<LowStockProducts data={dashboard?.products}/>
				</Grid>)}
				<Grid item lg={9} sm={8} xl={9} xs={12}>
					<DebtsCalendar handlerDebtDatePay={handlerDebtDatePay} events={dashboard?.debtPayments}/>
				</Grid>
				{/*<Grid item>*/}
				{/*	<Budget />*/}
				{/*</Grid>*/}
				{/*<Grid item>*/}
				{/*	<TotalCustomers />*/}
				{/*</Grid>*/}
				{/*<Grid item>*/}
				{/*	<TasksProgress />*/}
				{/*</Grid>*/}
				{/*<Grid item>*/}
				{/*	<TotalProfit />*/}
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

