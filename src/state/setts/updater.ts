import { useUpdateSetts, useSetts } from './hooks'
import { fetchSetts } from 'data/setts'
import { useEffect } from 'react'
export default function Updater() {
  const updateSetts = useUpdateSetts()
  const setts = useSetts()
  useEffect(() => {
    async function update() {
      if (setts && setts.length == 0) {
        const { error, data } = await fetchSetts()
        console.log(data)
        if (!error) {
          updateSetts(data)
        }
      }
    }
    update()
  }, [])
  return null
}
