import { updateSettData, updateVaultInfo, updatePrices } from './actions'
import { createReducer } from '@reduxjs/toolkit'

export interface SettInfo {
  name: string
  vaultToken: string
  tvl: number
  ppfs: number
  minApr: number
  maxApr: number
  sources: Array<RewardsSource>
}
export interface RewardsSource {
  name: string
  minApr: number
  maxApr: number
  boostable: boolean
}

export interface WhaleInfo {
  address: string
  shareBalance: number
  value: number
}
export interface StrategyInfo {
  address: string
  numHarvests: number
  totalEarnings: number
}
export interface VaultTransfers {
  address: string
  transactionHash: string
  amount: number
  value: number
}
export interface HarvestInfo {
  transactionHash: string
  earnings: number
  blockNumber: number
}
export interface VaultInfo {
  whaleInfo: Array<WhaleInfo>
  deposits: Array<VaultTransfers>
  withdrawals: Array<VaultTransfers>
  harvests: Array<HarvestInfo>
  strategy: StrategyInfo
}
export interface Prices {
  [token: string]: number
}
interface Setts {
  setts: Array<SettInfo>
  vaults: {
    [vault: string]: VaultInfo
  }
  prices: Prices
}

const initialState: Setts = {
  setts: [],
  vaults: {},
  prices: {},
}

export default createReducer(initialState, (builder) => {
  builder
    .addCase(updateSettData, (state, { payload: { setts } }) => {
      state.setts = setts
    })
    .addCase(updateVaultInfo, (state, { payload: { vaultAddress, vault } }) => {
      state.vaults[vaultAddress] = vault
    })
    .addCase(updatePrices, (state, { payload: { prices } }) => {
      state.prices = prices
    })
})
