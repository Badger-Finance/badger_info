import React from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const RewardsBarChart = (props: any) => {
  return (
    <ResponsiveContainer width="99%">
      <BarChart
        width={300}
        height={500}
        data={props.data}
        margin={{
          top: 40,
          right: 20,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dx={-10} dy={50} dataKey="sett" height={200} angle={-30} interval={0} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default RewardsBarChart
