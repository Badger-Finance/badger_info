import { ANALYTICS_API_URL } from 'data/urls'

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
