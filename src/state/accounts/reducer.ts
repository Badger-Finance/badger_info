import { updateAccountData } from './actions'
import { createReducer } from '@reduxjs/toolkit'

export interface AccountData {
  balances: Balance
  netWorth: number
  boost: number
  boostRank: number
}
export interface Balance {
  assetName: string
  value: number
  balance: number
  multiplier: number
}

interface AccountsState {
  [address: string]: AccountData
}

export const initalState: AccountsState = {}

export default createReducer(initalState, (builder) => {
  builder.addCase(updateAccountData, (state, { payload: { address, accountData } }) => {
    state[address] = accountData
  })
})
