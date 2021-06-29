import { formatDollarAmount } from './../../utils/numbers'
const PRICES_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cbadger-dao&vs_currencies=usd'
export async function fetchPrices() {
  const result = await fetch(PRICES_URL)
  const json = await result.json()
  return {
    btc: json.bitcoin.usd,
    eth: json.ethereum.usd,
    badger: json['badger-dao'].usd,
  }
}
