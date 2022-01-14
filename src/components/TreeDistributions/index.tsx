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
}

export default function TreeDistributionsChart(props: Props) {
  const dists = useMemo(() => {
    const distsByToken: any = {}
    props.dists.forEach((d: any) => {
      const name = d.sett.name
      if (name in distsByToken) {
        distsByToken[name].push({
          amount: d.amount,
          timestamp: d.timestamp,
          id: d.id,
          blockNumber: d.blockNumber,
        })
      } else {
        distsByToken[name] = []
      }
    })

    console.log(distsByToken)
    return distsByToken
  }, [props.dists])
  const colors = ['green', 'blue', 'orange', 'purple', 'pink']

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
            tickFormatter={(ut) => {
              console.log(ut)
              if (typeof ut == 'string') {
                return ''
              } else {
                return new Date(ut * 1000).toISOString().substr(11, 8)
              }
            }}
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
          {Object.keys(dists).length > 0 &&
            Object.entries(dists).map((d: any, index: number) => {
              return <Scatter key={d[0]} name={d[0]} data={d[1]} fill={colors[index]} shape="square" />
            })}
        </ScatterChart>
      </ResponsiveContainer>
    </>
  )
}
