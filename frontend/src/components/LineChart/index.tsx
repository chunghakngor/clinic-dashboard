import React from "react";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const width = 500;
const height = 250;
const dotRadius = 8;
const margin = { top: 5, right: 10, left: 10, bottom: 5 };

export const SingleLineChart = ({ data, name, dataKey, colour, title }) => {
  return (
    <ResponsiveContainer width="90%" height={height}>
      <LineChart data={data} margin={margin} label>
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

export const MultiLineChart = ({ data, name, dataKey, colour, title }) => {
  return (
    <ResponsiveContainer width="95%" height={height}>
      <LineChart data={data} margin={margin} label>
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
