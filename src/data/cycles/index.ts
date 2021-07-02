import { ANALYTICS_API_URL, ETHERSCAN_BLOCK_URL } from 'data/urls'

export async function fetchCycles(page: number) {
  try {
    const result = await fetch(`${ANALYTICS_API_URL}/cycles/${page}`)
    const json = await result.json()
    return {
      error: false,
      data: json,
    }
  } catch (error) {
    return {
      error: true,
      data: [],
    }
  }
}
export async function fetchCycle(cycleNumber: number) {
  try {
    const result = await fetch(`${ANALYTICS_API_URL}/cycle/${cycleNumber}`)
    const json = await result.json()
    return {
      error: false,
      data: json,
    }
  } catch (error) {
    return {
      error: true,
      data: {},
    }
  }
}

export async function getTimestampOfBlock(blockNumber: number) {
  try {
    const result = await fetch(`${ETHERSCAN_BLOCK_URL}${blockNumber}&apikey=B3M5SZUJQ6SFHI3KBFWSW6QITTH2PFZRTQ`)
    const json = await result.json()
    return {
      error: false,
      data: Number(json['result']['timeStamp']),
    }
  } catch (error) {
    return {
      error: true,
      data: 0,
    }
  }
}
