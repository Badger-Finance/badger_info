import { SettInfo, VaultInfo, Prices } from './reducer'
import { createAction } from '@reduxjs/toolkit'

// protocol wide info
export const updateSettData = createAction<{ setts: Array<SettInfo> }>('setts/updateSettData')
export const updateVaultInfo = createAction<{ vaultAddress: string; vault: VaultInfo }>('setts/updateVaultInfo')
export const updatePrices = createAction<{ prices: Prices }>('setts/updatePrices')
