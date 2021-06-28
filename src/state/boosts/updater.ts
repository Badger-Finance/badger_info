import { fetchBoosts } from 'data/boosts'
import { useEffect } from 'react'
import { useBoostData, useUpdateBoostData } from './hooks'

export default function Updater() {
  const updateBoostData = useUpdateBoostData()
  const boostData = useBoostData()
  useEffect(() => {
    if (boostData.length == 0) {
      const { error, data } = fetchBoosts()
      if (!error) {
        updateBoostData(data)
      }
    }
  }, [])
  return null
}
