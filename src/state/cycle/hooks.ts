import { addCyclePage } from './actions'
import { CycleData } from './reducer'
import { AppState, AppDispatch } from '../index'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'

export function useAddCyclePage() {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(
    (cycles: Array<CycleData>, page: number) =>
      dispatch(
        addCyclePage({
          cycles,
          page,
        })
      ),
    [dispatch]
  )
}
export function useCyclePage(page: number) {
  return useSelector((state: AppState) => state.cycle.cyclePages[page])
}
export function useCyclePages() {
  return useSelector((state: AppState) => state.cycle.cyclePages)
}
export function useCycle(cycleNumber: number) {
  return useSelector((state: AppState) => {
    for (const [pageNo, page] of Object.entries(state.cycle.cyclePages)) {
      const result = page.find((cycleData) => cycleData.cycle == cycleNumber)
      if (result) {
        return result
      }
    }
    return undefined
  })
}
