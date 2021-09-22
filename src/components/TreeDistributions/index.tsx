import React, { useMemo } from 'react'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from 'recharts'

interface Props {
  dists: any
  settNames: any
}

function distsByToken(treeDists: any, settNames: any) {
  const distsByToken: any = {}
  Object.keys(treeDists).map((sett) => {
    const name = settNames[sett]
    const dists = treeDists[sett]
    dists.forEach((dist: any) => {
      const { token, amount, timestamp, id } = dist
      if (!(token.symbol in distsByToken)) {
        distsByToken[token.symbol] = []
      }
      distsByToken[token.symbol].push({
        amount: amount / 1e18,
        timestamp,
        name,
        id,
      })
    })
  })
  return distsByToken
}
export default function TreeDistributionsChart(props: Props) {
  const dists = useMemo(() => {
    return distsByToken(props.dists, props.settNames)
  }, [])
  const colors = ['green', 'blue', 'orange', 'purple', 'pink']

  console.log(dists)
  return (
    <>
      <ResponsiveContainer>
        <ScatterChart
          height={500}
          width={500}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="4 4" />
          <YAxis width={100} type="number" dataKey="amount" name="amount" unit="">
            <Label fill="white" position="left" offset={-50}>
              Amount
            </Label>
          </YAxis>
          <XAxis
            tickFormatter={(ut) => new Date(ut * 1000).toISOString().substr(11, 8)}
            dataKey="timestamp"
            name="timestamp"
            unit=""
            height={50}
          >
            <Label fill="white" offset={-20} position="bottom">
              Time
            </Label>
          </XAxis>
          <ZAxis type="category" dataKey={'name'} range={[300, 300]} />
          <Legend />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          {Object.entries(dists).map((d: any, index: number) => {
            return <Scatter key={d[0]} name={d[0]} data={d[1]} fill={colors[index]} shape="square" />
          })}
        </ScatterChart>
      </ResponsiveContainer>
    </>
  )
}
