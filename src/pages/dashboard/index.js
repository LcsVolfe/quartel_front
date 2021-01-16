import React from 'react';
import {Container, Grid} from "@material-ui/core";
import Budget from "./components/budget";
import TotalCustomers from "./components/total-customers";
import TasksProgress from "./components/task-progress";
import TotalProfit from "./components/total-profit";

const DashboardPage = () => {

    return (
        <Container maxWidth={false}>
            <Grid container spacing={3}>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <Budget />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <TotalCustomers />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <TasksProgress />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <TotalProfit />
                </Grid>
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

export default DashboardPage;
