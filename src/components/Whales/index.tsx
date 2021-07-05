import React from 'react'
import { useWhaleData } from 'state/setts/hooks'

interface Props {
  vaultAddress: string
}
const Whales = (props: Props) => {
  const whaleInfo = useWhaleData(props.vaultAddress)
  console.log(whaleInfo)
  return <div>test</div>
}
export default Whales
