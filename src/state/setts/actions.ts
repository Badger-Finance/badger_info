import { SettInfo, VaultInfo } from './reducer'
import { createAction } from '@reduxjs/toolkit'

// protocol wide info
export const updateSettData = createAction<{ setts: Array<SettInfo> }>('setts/updateSettData')
export const updateVaultInfo = createAction<{ vaultAddress: string; vault: VaultInfo }>('setts/updateVaultInfo')
