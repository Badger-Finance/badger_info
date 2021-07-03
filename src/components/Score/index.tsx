import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { TYPE } from 'theme'
import { DarkGreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import { PageButtons, Arrow, Break } from 'components/shared'
import useTheme from 'hooks/useTheme'

const TableWrapper = styled.div`
    display: flex;
    flex-direction: row
    height: 300px;
    width: 60%;
    margin-top: 10px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
  padding-top: 10px;
`
const DataRow = (props: any) => {
  return (
    <>
      <Row>
        <TYPE.label style={{ width: '10%' }}>{props.number}</TYPE.label>
        <TYPE.label style={{ width: '70%' }}>{props.first}</TYPE.label>
        <TYPE.label style={{ width: '30%' }}>{props.second}</TYPE.label>
      </Row>
      <Break />
    </>
  )
}

const ScoreTable = () => {
  const theme = useTheme()
  return (
    <TableWrapper>
      <DarkGreyCard>
        <>
          <Row>
            <TYPE.label style={{ width: '10%', color: theme.text2 }}>{'#'}</TYPE.label>
            <TYPE.label style={{ width: '70%', color: theme.text2 }}>{'Condition'}</TYPE.label>
            <TYPE.label style={{ width: '30%', color: theme.text2 }}>{'Fulfilled'}</TYPE.label>
          </Row>
          <Break />
        </>
        <DataRow number={'1'} first={'Badger Staking'} second={'✅'} />
        <DataRow number={'2'} first={'Condition'} second={'Fulfilled'} />
        <DataRow number={'3'} first={'Condition'} second={'Fulfilled'} />
      </DarkGreyCard>
    </TableWrapper>
  )
}

export default ScoreTable
