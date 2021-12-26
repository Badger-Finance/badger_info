import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { TYPE } from 'theme'
import { DarkGreyCard } from 'components/Card'
import { PageButtons, Arrow, Break } from 'components/shared'
import tokens, { getTokenName } from 'constants/tokens'
import useTheme from 'hooks/useTheme'
import { EXPLORER_URL } from 'data/urls'

const TableWrapper = styled.div`
display: flex;
flex-direction: row
width: 500px;
@media screen and (max-width: 800px) {
  width: 100%
}
margin-top: 10px;
margin-right: 20px;
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
        <a
          style={{ width: '60%', wordBreak: 'break-word' }}
          href={`${EXPLORER_URL}/address/${props.first}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <TYPE.label>{getTokenName(props.first)}</TYPE.label>
        </a>
        <TYPE.label style={{ width: '30%', textAlign: 'center' }}>{(props.second / 1e18).toFixed(3)}</TYPE.label>
      </Row>
      <Break />
    </>
  )
}

const ClaimableTable = (props: any) => {
  const theme = useTheme()
  console.log(props.claimable)

  return (
    <TableWrapper>
      <DarkGreyCard>
        <>
          <Row>
            <TYPE.label style={{ width: '10%', color: theme.text2 }}>{'#'}</TYPE.label>
            <TYPE.label style={{ width: '60%', color: theme.text2 }}>{'Tokens Claimed'}</TYPE.label>
            <TYPE.label style={{ width: '30%', color: theme.text2, textAlign: 'center' }}>{'Amount'}</TYPE.label>
          </Row>
          <Break />
        </>
        {props.claimable ? (
          Object.entries(props.claimable).map((cb: any, index: number) => {
            const [token, claimable] = cb
            return <DataRow key={index} number={index + 1} first={token} second={claimable} />
          })
        ) : (
          <div>loading</div>
        )}
      </DarkGreyCard>
    </TableWrapper>
  )
}
export default ClaimableTable
