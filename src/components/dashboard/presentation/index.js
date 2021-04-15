import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
	Box,
	Container,

	Grid,
} from "@material-ui/core";
import LowStockProducts from "./components/low-stock-products";
import DebtsCalendar from "./components/debts-calendar";
import Budget from "../../shared/budget";

const Dashborad = ({loading, onClick, dashboard, handlerDebtDatePay }) => {
	return (
		<Container maxWidth={false}>
			{/*<Grid container spacing={3}>*/}
			{/*	<Grid item>*/}
			{/*		<Budget value={5} />*/}
			{/*	</Grid>*/}
			{/*</Grid>*/}
			<Grid container spacing={3}>
				<Grid item lg={3} sm={4} xl={3} xs={12}>
					<LowStockProducts data={dashboard?.products}/>
					{/*<Box mt={2}>*/}
					{/*	<Budget label={'Obras em andamento'} value={3}/>*/}
					{/*</Box>*/}
				</Grid>
				<Grid item lg={9} sm={8} xl={9} xs={12}>
					<DebtsCalendar handlerDebtDatePay={handlerDebtDatePay} events={dashboard?.debtPayments}/>
				</Grid>

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

