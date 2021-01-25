import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface SingleChartInterface {
  data: any;
  name: string;
  dataKey: string;
  colour: string;
  title: string;
}

interface MultiChartInterface {
  data: any;
  name: string[];
  dataKey: string[];
  colour: string[];
  title: string;
}

// const width: number = 500;
const height: number = 250;
const dotRadius: number = 8;
const margin: object = { top: 5, right: 10, left: 10, bottom: 5 };

export const SingleLineChart = ({ data, name, dataKey, colour, title }: SingleChartInterface) => {
  return (
    <ResponsiveContainer width="90%" height={height}>
      <LineChart data={data} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" name={name} dataKey={dataKey} stroke={colour} activeDot={{ r: dotRadius }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const MultiLineChart = ({ data, name, dataKey, colour, title }: MultiChartInterface) => {
  return (
    <ResponsiveContainer width="95%" height={height}>
      <LineChart data={data} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {name.map((n, index) => {
          return (
            <Line
              type="monotone"
              name={n}
              dataKey={dataKey[index]}
              stroke={colour[index] || "#8884d8"}
              activeDot={{ r: dotRadius }}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};
