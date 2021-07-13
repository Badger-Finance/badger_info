import { updateAccountData, updateScoreData, updateNftData } from './actions'
import { AccountData } from './reducer'
import { AppState, AppDispatch } from '../index'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect } from 'react'
import { fetchNftScore, fetchScores } from 'data/accounts'

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

function useNftScores(address: string) {
  return useSelector((state: AppState) => state.accounts.nftScores[address])
}
export function useNftScoresData(address: string) {
  const dispatch = useDispatch<AppDispatch>()
  const scores = useNftScores(address)
  useEffect(() => {
    async function fetch() {
      const { error, data } = await fetchNftScore(address)
      console.log(error, data)
      if (!error) {
        dispatch(
          updateNftData({
            address,
            nftData: data,
          })
        )
      } else {
        dispatch(
          updateNftData({
            address,
            nftData: data,
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
