import React, { useState, useMemo } from 'react'
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
`

interface CycleProps {
  cycleNumber: number
  root: string
  contentHash: string
  startBlock: number
  endBlock: number
}
const Cycle = (props: any) => {
  return (
    <AutoColumn gap="10px">
      <LinkWrapper to={`/cycle/${props.cycle}`}>
        <TYPE.largeHeader>Cycle {props.cycle}</TYPE.largeHeader>
      </LinkWrapper>
      <DarkGreyCard>
        <AutoColumn gap="lg">
          <AutoColumn gap="4px">
            <TYPE.main fontWeight={400}>Root</TYPE.main>
            <TYPE.label fontSize="20px">{props.merkleRoot}</TYPE.label>
          </AutoColumn>
          <AutoColumn gap="4px">
            <TYPE.main fontWeight={400}>Content Hash</TYPE.main>
            <TYPE.label fontSize="20px">{props.contentHash}</TYPE.label>
          </AutoColumn>
          <AutoColumn gap="4px">
            <TYPE.main fontWeight={400}>Start Block</TYPE.main>
            <TYPE.label fontSize="20px">{props.startBlock}</TYPE.label>
          </AutoColumn>
          <AutoColumn gap="4px">
            <TYPE.main fontWeight={400}>End Block</TYPE.main>
            <TYPE.label fontSize="20px">{props.endBlock}</TYPE.label>
          </AutoColumn>
        </AutoColumn>
      </DarkGreyCard>
    </AutoColumn>
  )
}

export default Cycle
