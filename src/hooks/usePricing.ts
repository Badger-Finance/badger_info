import { fetchPrices } from 'data/pricing'
import { useState, useEffect } from 'react'
export function usePrices() {
  const [prices, setPrices] = useState({
    btc: 0,
    eth: 0,
    badger: 0,
  })
  useEffect(() => {
    async function fetch() {
      const data = await fetchPrices()
      setPrices(data)
    }
    fetch()
  }, [])
  return prices
}
