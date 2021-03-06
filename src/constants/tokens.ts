import { useSettByAddress } from './../state/setts/hooks'
import { getAddress } from '@ethersproject/address'

interface Tokens {
  [address: string]: string
}

const tokens: Tokens = {
  '0x3472A5A71965499acd81997a54BBA8D852C6E53d': 'Badger',
  '0x798D1bE841a82a273720CE31c822C61a67a601C3': 'Digg',
  '0x20c36f062a31865bED8a5B1e512D9a1A20AA333A': 'DFD',
  '0x2B5455aac8d64C14786c3a29858E43b5945819C0': 'bCvxCrv',
  '0x53C8E199eb2Cb7c01543C137078a038937a68E40': 'bCvx',
  '0xfd05D3C7fe2924020620A8bE4961bBaA747e6305': 'bveCVX',
  '0x8798249c2E607446EfB7Ad49eC89dD1865Ff4272': 'xSushi',
  '0x11cDb42B0EB46D95f990BeDD4695A6e3fA034978': 'Crv',
  '0xe774D1FB3133b037AA17D39165b8F45f444f632d': 'ETH/SUSHI bSLP',
  '0x7e7E112A68d8D2E221E11047a72fFC1065c38e1a': 'bDigg',
  '0x68c269B60c58c4ed50c63B217BA0EC7f8a371920': 'DROPT-3',
  '0xa0246c9032bC3A600820415aE600c6388619A14D': 'Farm',
}

export function getTokenName(address: string): string {
  return tokens[getAddress(address)]
}

export default tokens
