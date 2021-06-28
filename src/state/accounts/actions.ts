import { AccountData } from './reducer'
import { createAction } from '@reduxjs/toolkit'

export const updateAccountData = createAction<{ address: string; accountData: AccountData }>('account/updateBalances')
