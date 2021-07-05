import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { TYPE } from 'theme'
import { DarkGreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import { PageButtons, Arrow, Break } from 'components/shared'
import useTheme from 'hooks/useTheme'
import { useScoreData } from 'state/accounts/hooks'

const TableWrapper = styled.div`
  display: flex;
  flex-direction: row
  width: 500px;
  @media screen and (max-width: 800px) {
    width: 100%
  }
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
        <TYPE.label style={{ width: '30%', textAlign: 'center' }}>{props.second}</TYPE.label>
      </Row>
      <Break />
    </>
  )
}

const ScoreTable = (props: { address: string }) => {
  const scoreData = useScoreData(props.address)
  const theme = useTheme()
  return (
    <TableWrapper>
      <DarkGreyCard>
        <>
          <Row>
            <TYPE.label style={{ width: '10%', color: theme.text2 }}>{'#'}</TYPE.label>
            <TYPE.label style={{ width: '70%', color: theme.text2 }}>{'Condition'}</TYPE.label>
            <TYPE.label style={{ width: '30%', color: theme.text2, textAlign: 'center' }}>{'Fulfilled'}</TYPE.label>
          </Row>
          <Break />
        </>
        {scoreData ? (
          scoreData.map((score, index) => {
            const name = Object.keys(score)[0]
            const scoreNumber = Object.values(score)[0]
            return <DataRow key={index} number={index + 1} first={name} second={scoreNumber > 0 ? '✅' : '❌'} />
          })
        ) : (
          <div>loading</div>
        )}
      </DarkGreyCard>
    </TableWrapper>
  )
}

export default ScoreTable
