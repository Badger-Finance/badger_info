import { BADGER_API_URL } from './../urls'

export async function fetchSetts() {
  try {
    const result = await fetch(`${BADGER_API_URL}/setts`)
    const json = await result.json()
    return {
      error: false,
      data: json.map((sett: any) => {
        return {
          name: sett.name,
          vaultToken: sett.vaultToken,
          tvl: sett.value,
          minApr: sett.minApr || sett.apr,
          maxApr: sett.maxApr || sett.apr,
        }
      }),
    }
  } catch (error) {
    console.log(error)
    return {
      error: true,
      data: [],
    }
  }
}
