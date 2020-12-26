import React, { useEffect } from "react";

import { Box, Grid, Typography, Paper, Card, CardContent } from "@material-ui/core";
import { SingleLineChart, MultiLineChart } from "../../components/LineChart";

const Dashboard = () => {
  useEffect(() => {
    document.title = "React Clinic | Dashboard";
  }, []);

  return (
    <div>
      <Grid container direction="column" justify="center" alignItems="center" spacing={6}>
        <FirstRow />
        <SecondRow />
        <ThirdRow />
      </Grid>
    </div>
  );
};

const FirstRow = () => {
  return (
    <Grid item container direction="row" justify="space-around" alignItems="stretch" spacing={2}>
      <DashboardCard heading={"New Patient"} body={"352"} />
      <DashboardCard heading={"Recovered"} body={"54"} />
      <DashboardCard heading={"Revenue"} body={"$ 6354.00"} />
      <DashboardCard heading={"Profit"} body={"$ 3545.00"} />
      <DashboardCard heading={"Net"} body={"$ 2809.00"} />
    </Grid>
  );
};

const SecondRow = () => {
  return (
    <Grid container item direction="row" justify="space-around" alignItems="center" spacing={2}>
      <ChartWrapper chart={<PatientChart />} title={"Monthly Patient"} />
      <ChartWrapper chart={<RecoveredChart />} title={"Monthly Recovered"} />
      <ChartWrapper chart={<RevenueChart />} title={"Monthly Revenue"} />
    </Grid>
  );
};

const ThirdRow = () => {
  return (
    <Grid container item direction="row" justify="space-around" alignItems="center" spacing={2}>
      <ChartWrapper chart={<RevenueChart />} title={"Monthly Revenue"} />
      <ChartWrapper chart={<PatientChart />} title={"Monthly Patient"} />
      <ChartWrapper chart={<RecoveredChart />} title={"Monthly Recovered"} />
    </Grid>
  );
};

const DashboardCard = ({ heading, body }) => {
  return (
    <Grid item>
      <Box textAlign="center">
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              {heading}
            </Typography>
            <Typography variant="h5" component="h2">
              {body}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
};

const ChartWrapper = ({ title, chart }) => {
  return (
    <Grid item>
      <Paper elevation={1} style={{ padding: "20px" }}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item style={{ paddingBottom: "1em" }}>
            <Typography varient="h6" component="h2">
              {title}
            </Typography>
          </Grid>
          <Grid item>{chart}</Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

const PatientChart = () => {
  const data = [
    { name: "Aug 2020", patient: 203 },
    { name: "Sep 2020", patient: 423 },
    { name: "Oct 2020", patient: 123 },
    { name: "Nov 2020", patient: 323 },
    { name: "Dec 2020", patient: 153 },
    { name: "Jan 2021", patient: 354 },
  ];

  return <SingleLineChart data={data} name={"Monthly Patients"} dataKey={"patient"} colour={"red"} />;
};

const RevenueChart = () => {
  const data = [
    { name: "Aug 2020", rev: 5203, profit: 2035, net: 1235 },
    { name: "Sep 2020", rev: 4423, profit: 3235, net: 2125 },
    { name: "Oct 2020", rev: 3123, profit: 1235, net: 835 },
    { name: "Nov 2020", rev: 2323, profit: 3235, net: 2435 },
    { name: "Dec 2020", rev: 1153, profit: 1535, net: 935 },
    { name: "Jan 2021", rev: 6354, profit: 3545, net: 2545 },
  ];

  const name = ["Revenue", "Profit", "Net Income"];
  const dataKey = ["rev", "profit", "net"];
  const colour = ["orange", "darkgreen", "blue"];

  return <MultiLineChart data={data} name={name} dataKey={dataKey} colour={colour} />;
};

const RecoveredChart = () => {
  const data = [
    { name: "Aug 2020", patient: 53 },
    { name: "Sep 2020", patient: 23 },
    { name: "Oct 2020", patient: 53 },
    { name: "Nov 2020", patient: 43 },
    { name: "Dec 2020", patient: 53 },
    { name: "Jan 2021", patient: 54 },
  ];

  return <SingleLineChart data={data} name={"Patients Recovered"} dataKey={"patient"} colour={"green"} />;
};

export default Dashboard;
