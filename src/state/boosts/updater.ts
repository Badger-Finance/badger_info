import { fetchBoosts } from 'data/boosts'
import { useEffect } from 'react'
import { useBoostData, useUpdateBoostData } from './hooks'

export default function Updater() {
  const updateBoostData = useUpdateBoostData()
  const boostData = useBoostData()
  useEffect(() => {
    async function update() {
      if (boostData.length == 0) {
        const { error, data } = await fetchBoosts()
        if (!error) {
          updateBoostData(data)
        }
      }
    }
    update()
  }, [])
  return null
}
