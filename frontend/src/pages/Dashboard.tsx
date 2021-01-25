import React from "react";
import { Box, Grid, Typography, Card, CardContent } from "@material-ui/core";
import { ChartWrapper, PatientChart, RecoveredChart, RevenueChart } from "../components/Chart";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  return (
    <div>
      <Helmet>
        <title>React Clinic | Dashboard</title>
      </Helmet>
      <Grid container alignItems="stretch" justify="center" spacing={6}>
        <FirstRow />
        <SecondRow />
      </Grid>
    </div>
  );
};

const FirstRow = () => {
  return (
    <Grid item xs={12} container direction="row" justify="space-evenly" alignItems="stretch" spacing={6}>
      <DashboardCard heading={"New Patient"} body={"352"} />
      <DashboardCard heading={"Recovered"} body={"54"} />
      <DashboardCard heading={"Revenue"} body={"$ 6354.00"} />
      <DashboardCard heading={"Profit"} body={"$ 3545.00"} />
      <DashboardCard heading={"Net"} body={"$ 2809.00"} />
      <DashboardCard heading={"Net"} body={"$ 2809.00"} />
    </Grid>
  );
};

const SecondRow = () => {
  return (
    <Grid item xs={12} container justify="space-around" alignItems="center" spacing={2}>
      <ChartWrapper chart={<PatientChart />} />
      <ChartWrapper chart={<RecoveredChart />} />
      <ChartWrapper chart={<RevenueChart />} />
    </Grid>
  );
};

interface DashboardCardInterface {
  heading: string;
  body: string;
}

const DashboardCard = ({ heading, body }: DashboardCardInterface) => {
  return (
    <Grid item xs={6} md={4} lg={2}>
      <Box textAlign="center">
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom noWrap>
              {heading}
            </Typography>
            <Typography variant="h5" component="h2" noWrap>
              {body}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
};

export default Dashboard;
