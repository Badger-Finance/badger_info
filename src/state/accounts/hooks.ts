import { updateAccountData, updateScoreData } from './actions'
import { AccountData } from './reducer'
import { AppState, AppDispatch } from '../index'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect } from 'react'
import { fetchScores } from 'data/accounts'

export function useUpdateAccountData(address: string) {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback((accountData: AccountData) => dispatch(updateAccountData({ address, accountData })), [dispatch])
}
export function useAccountData(address: string) {
  return useSelector((state: AppState) => state.accounts.accounts[address])
}

function useScores(address: string) {
  return useSelector((state: AppState) => state.accounts.scores[address])
}
export function useScoreData(address: string) {
  const dispatch = useDispatch<AppDispatch>()
  const scores = useScores(address)
  useEffect(() => {
    async function fetch() {
      const { error, data } = await fetchScores(address)
      if (!error) {
        dispatch(
          updateScoreData({
            address,
            scoreData: data,
          })
        )
      }
    }
    if (!scores) {
      fetch()
    }
  }, [address, scores, dispatch])
  return scores
}
