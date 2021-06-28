import { updateAccountData } from './actions'
import { AccountData } from './reducer'
import { AppState, AppDispatch } from '../index'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'

export function useUpdateAccountData(address: string) {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback((accountData: AccountData) => dispatch(updateAccountData({ address, accountData })), [dispatch])
}
export function useAccountData(address: string) {
  return useSelector((state: AppState) => state.accounts[address])
}
