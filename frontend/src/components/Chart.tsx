import React from "react";
import { SingleLineChart, MultiLineChart } from "./LineCharts";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

interface ChartWrapperInterface {
  chart: JSX.Element;
}

export const ChartWrapper = ({ chart }: ChartWrapperInterface) => {
  return (
    <Grid item sm={12} lg={4}>
      <Paper elevation={1} style={{ padding: "20px" }}>
        {chart}
      </Paper>
    </Grid>
  );
};

export const PatientChart = () => {
  const data = [
    { name: "Aug 2020", patient: 203 },
    { name: "Sep 2020", patient: 423 },
    { name: "Oct 2020", patient: 123 },
    { name: "Nov 2020", patient: 323 },
    { name: "Dec 2020", patient: 153 },
    { name: "Jan 2021", patient: 354 },
  ];

  return (
    <SingleLineChart data={data} name={"Monthly Patients"} dataKey={"patient"} colour={"red"} title={"Monthly Patients"} />
  );
};

export const RevenueChart = () => {
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

  return <MultiLineChart data={data} name={name} dataKey={dataKey} colour={colour} title={"Monthly Revenue"} />;
};

export const RecoveredChart = () => {
  const data = [
    { name: "Aug 2020", patient: 53 },
    { name: "Sep 2020", patient: 23 },
    { name: "Oct 2020", patient: 53 },
    { name: "Nov 2020", patient: 43 },
    { name: "Dec 2020", patient: 53 },
    { name: "Jan 2021", patient: 54 },
  ];

  return (
    <SingleLineChart data={data} name={"Patients Recovered"} dataKey={"patient"} colour={"green"} title={"Monthly Recovered"} />
  );
};
