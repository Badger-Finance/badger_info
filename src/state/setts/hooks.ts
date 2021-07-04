import { updateSettData } from './actions'
import { AppState, AppDispatch } from './../index'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SettInfo } from './reducer'

export const useUpdateSetts = () => {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(
    (setts: Array<SettInfo>) =>
      dispatch(
        updateSettData({
          setts,
        })
      ),
    [dispatch]
  )
}

export const useSetts = () => {
  return useSelector((state: AppState) => state.setts.setts)
}
