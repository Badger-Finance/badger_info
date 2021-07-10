import { addCyclePage, addCycle, addCycleError } from './actions'
import { CycleData } from './reducer'
import { AppState, AppDispatch } from '../index'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect } from 'react'
import { fetchCycle, fetchCycles } from 'data/cycles'

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

export function useAddCycle() {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback((cycle: CycleData) => dispatch(addCycle({ cycle })), [dispatch])
}

export function useCyclePage(page: number) {
  return useSelector((state: AppState) => state.cycle.cyclePages[page])
}
export function useCyclePages() {
  return useSelector((state: AppState) => state.cycle.cyclePages)
}
export function useCycle(cycleNumber: number) {
  return useSelector((state: AppState) => state.cycle.cycles[cycleNumber])
}
export function useCycleError(cycleNumber: number) {
  return useSelector((state: AppState) => state.cycle.errors[cycleNumber])
}

export function useCycleData(cycleNumber: number) {
  const dispatch = useDispatch<AppDispatch>()
  const cycle = useCycle(cycleNumber)
  useEffect(() => {
    async function fetch() {
      const { error, data } = await fetchCycle(cycleNumber)
      dispatch(
        addCycleError({
          cycleNumber,
          errorStatus: !data.success,
        })
      )
      if (!error) {
        dispatch(addCycle({ cycle: data.data }))
      }
    }
    if (!cycle) {
      fetch()
    }
  }, [cycleNumber, cycle, dispatch])
  return cycle
}

export function useCyclePageData(pageNumber: number) {
  const dispatch = useDispatch<AppDispatch>()
  const page = useCyclePage(pageNumber)
  useEffect(() => {
    async function fetch() {
      const { error, data } = await fetchCycles(pageNumber)
      if (!error) {
        dispatch(addCyclePage({ cycles: data.data, page: pageNumber }))
      }
    }
    if (!page) {
      fetch()
    }
  }, [pageNumber, page, dispatch])
  return page
}
