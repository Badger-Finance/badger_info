import React from 'react'
import { formatDollarAmount } from 'utils/numbers'
import { AutoColumn } from 'components/Column'
import { TYPE } from 'theme'
import { DarkGreyCard } from 'components/Card'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const LinkWrapper = styled(Link)`
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
  text-decoration-color: white;
  padding-left: 1rem;
  height: 5rem;
  overflow-wrap: break-word;
  min-width: 180px;
`
interface VaultInfoProps {
  name: string
  id: string
  tvl: number
  minApr: number
  maxApr: number
  minMult: number
  maxMult: number
}
const VaultInfo = (props: VaultInfoProps) => {
  return (
    <AutoColumn gap="10px">
      <LinkWrapper to={`/vaults/${props.id}`}>
        <TYPE.largeHeader>{props.name}</TYPE.largeHeader>
      </LinkWrapper>
      <DarkGreyCard>
        <AutoColumn gap="lg">
          <AutoColumn gap="4px">
            <TYPE.main fontWeight={400}>TVL</TYPE.main>
            <TYPE.label fontSize="20px">{formatDollarAmount(props.tvl)}</TYPE.label>
          </AutoColumn>
          <AutoColumn gap="4px">
            <TYPE.main fontWeight={400}>APR</TYPE.main>
            <TYPE.label fontSize="20px">
              {props.minApr !== props.maxApr
                ? `${props.minApr.toFixed(2)}% - ${props.maxApr.toFixed(2)}%`
                : `${props.minApr.toFixed(2)}%`}
            </TYPE.label>
          </AutoColumn>
          <AutoColumn gap="4px">
            <TYPE.main fontWeight={400}>Multipliers</TYPE.main>
            <TYPE.label fontSize="20px">
              {props.minMult !== props.maxMult
                ? `${props.minMult.toFixed(2)}x - ${props.maxMult.toFixed(2)}x`
                : `${props.minMult.toFixed(2)}x`}
            </TYPE.label>
          </AutoColumn>
        </AutoColumn>
      </DarkGreyCard>
    </AutoColumn>
  )
}
export default VaultInfo
