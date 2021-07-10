import { fetchPrices } from 'data/setts'
import { useUpdateSetts, useSetts, useUpdatePrices, usePrices } from './hooks'
import { fetchSetts } from 'data/setts'
import { useEffect } from 'react'
export default function Updater() {
  const updateSetts = useUpdateSetts()
  const updatePrices = useUpdatePrices()
  const setts = useSetts()
  const prices = usePrices()
  useEffect(() => {
    async function update() {
      if (setts && setts.length == 0) {
        const { error, data } = await fetchSetts()
        //console.log(data)
        if (!error) {
          updateSetts(data)
        }
      }
      if (Object.keys(prices).length == 0) {
        const { error, data } = await fetchPrices()
        if (!error) {
          updatePrices(data)
        }
      }
    }
    update()
  }, [])
  return null
}
