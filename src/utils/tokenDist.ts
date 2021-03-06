import { SettInfo } from 'state/setts/reducer'
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
        ta[1] /= 1e18
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
export function tokenDistToChart(totalTokenDist: TokenDist, settNames: any) {
  console.log(settNames)
  const chartData: ChartData = {}
  if (totalTokenDist) {
    Object.entries(totalTokenDist).forEach((td) => {
      const sett = td[0]
      const dist = td[1]
      Object.entries(dist).forEach((ta) => {
        const token = ta[0]
        let amount = ta[1]
        amount /= 1e18
        if (!(tokens[token] in chartData)) {
          chartData[tokens[token]] = []
        }
        const settName = settNames[sett]
        chartData[tokens[token]].push({
          sett: settName ? settName.substr(settNames[sett].indexOf(' ') + 1) : '',
          amount,
        })
      })
    })
  }
  return chartData
}
