import { addCyclePage, addCycle, addCycleError, addHarvestData } from './actions'
import { CycleData } from './reducer'
import { AppState, AppDispatch } from '../index'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect } from 'react'
import { fetchCycle, fetchCycles, fetchHarvests } from 'data/cycles'

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

export function useAddHarvests() {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback((harvests: any) => dispatch(addHarvestData({ harvests })), [dispatch])
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
export function useHarvests() {
  return useSelector((state: AppState) => state.cycle.harvests)
}

export function useHarvestData() {
  const dispatch = useDispatch<AppDispatch>()
  const harvests = useHarvests()
  useEffect(() => {
    async function fetch() {
      const { error, data } = await fetchHarvests(0, 100000000)
      if (!error) {
        dispatch(addHarvestData({ harvests: data }))
      }
    }
    if (harvests.length == 0) {
      fetch()
    }
  }, [harvests, dispatch])
  return harvests
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
          errorStatus: error,
        })
      )
      if (!error) {
        dispatch(addCycle({ cycle: data }))
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
        dispatch(addCyclePage({ cycles: data, page: pageNumber }))
      }
    }
    console.log('here')
    if (!page) {
      console.log('here2')
      fetch()
      console.log('here3')
    }
  }, [pageNumber, page, dispatch])
  return page
}
