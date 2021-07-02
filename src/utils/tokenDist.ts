import { TokenDist } from 'state/cycle/reducer'
import tokens from 'constants/tokens'
interface ChartElement {
  sett: string
  amount: number
}

export interface ChartData {
  [token: string]: Array<ChartElement>
}

export function sumTokenDist(totalTokenDist: TokenDist) {
  const total: any = {}
  if (totalTokenDist) {
    Object.entries(totalTokenDist).forEach((td) => {
      Object.entries(td[1]).forEach((ta) => {
        if (!(ta[0] in total)) {
          total[ta[0]] = 0
        }
        total[ta[0]] += Number(ta[1])
      })
    })
  }
  return Object.entries(total).map((value) => {
    return {
      token: value[0],
      amount: value[1],
    }
  })
}
export function tokenDistToChart(totalTokenDist: TokenDist) {
  const chartData: ChartData = {}
  if (totalTokenDist) {
    Object.entries(totalTokenDist).forEach((td) => {
      const sett = td[0]
      const dist = td[1]
      Object.entries(dist).forEach((ta) => {
        const token = ta[0]
        const amount = ta[1]
        if (!(tokens[token] in chartData)) {
          chartData[tokens[token]] = []
        }
        chartData[tokens[token]].push({
          sett: sett.split('.')[1],
          amount,
        })
      })
    })
  }
  return chartData
}
