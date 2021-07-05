import { updateAccountData, updateScoreData } from './actions'
import { createReducer } from '@reduxjs/toolkit'

export interface AccountData {
  balances: Balance
  netWorth: number
  boost: number
  boostRank: number
}
export interface Balance {
  assetName: string
  vaultAddress: string
  value: number
  balance: number
  multiplier: number
}

export interface ScoreData {
  [cond: string]: number
}
interface AccountsState {
  accounts: {
    [address: string]: AccountData
  }
  scores: {
    [address: string]: Array<ScoreData>
  }
}

export const initalState: AccountsState = {
  accounts: {},
  scores: {},
}

export default createReducer(initalState, (builder) => {
  builder
    .addCase(updateAccountData, (state, { payload: { address, accountData } }) => {
      state.accounts[address] = accountData
    })
    .addCase(updateScoreData, (state, { payload: { address, scoreData } }) => {
      state.scores[address] = scoreData
    })
})
