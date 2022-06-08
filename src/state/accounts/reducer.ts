import { updateAccountData, updateScoreData, updateNftData } from './actions'
import { createReducer } from '@reduxjs/toolkit'

export interface AccountData {
  balances?: Balance[]
  netWorth?: number
  boost?: number
  nativeBalance?: number
  nonNativeBalance?: number
  nftBalance?: number
  stakeRatio?: number
  boostRank?: number
  claimedBalances?: {
    [token: string]: number
  }
  claimableBalances?: {
    [token: string]: number
  }

  recentClaims?: Array<Claim>
}

export interface Claim {
  tx: string
  amount: number
  tokenAddr: string
  tokenSymbol: string
  cycle: number
  blockNumber: number
}

export interface Balance {
  assetName: string
  vaultAddress: string
  value: number
  balance: number
}

export interface ScoreData {
  [cond: string]: number
}
export interface Nft {
  amount: number
  token: string
}
interface AccountsState {
  accounts: {
    [address: string]: AccountData
  }
  scores: {
    [address: string]: Array<ScoreData>
  }
  nftScores: {
    [address: string]: Array<Nft>
  }
}

export const initalState: AccountsState = {
  accounts: {},
  scores: {},
  nftScores: {},
}

export default createReducer(initalState, (builder) => {
  builder
    .addCase(updateAccountData, (state, { payload: { address, accountData } }) => {
      state.accounts[address] = accountData
    })
    .addCase(updateScoreData, (state, { payload: { address, scoreData } }) => {
      state.scores[address] = scoreData
    })
    .addCase(updateNftData, (state, { payload: { address, nftData } }) => {
      state.nftScores[address] = nftData
    })
})
