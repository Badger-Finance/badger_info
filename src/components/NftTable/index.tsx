import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { TYPE } from 'theme'
import { DarkGreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import { PageButtons, Arrow, Break } from 'components/shared'
import NFTS from 'constants/nfts'
import useTheme from 'hooks/useTheme'

const TableWrapper = styled.div`
  display: flex;
  flex-direction: row
  margin-top: 10px;
  flex: 1;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
  padding-top: 10px;
`
const DataRow = (props: any) => {
  const [addr, id] = props.first.split('-')

  return (
    <>
      <Row>
        <TYPE.label style={{ width: '10%' }}>{props.number}</TYPE.label>
        <a
          style={{ width: '60%', wordBreak: 'break-word' }}
          href={`https://opensea.io/assets/${addr}/${id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <TYPE.label>{NFTS[props.first]}</TYPE.label>
        </a>
        <TYPE.label style={{ width: '30%', textAlign: 'center' }}>{props.second}</TYPE.label>
      </Row>
      <Break />
    </>
  )
}

const NftTable = (props: any) => {
  const theme = useTheme()
  return (
    <TableWrapper>
      <DarkGreyCard>
        <>
          <Row>
            <TYPE.label style={{ width: '10%', color: theme.text2 }}>{'#'}</TYPE.label>
            <TYPE.label style={{ width: '60%', color: theme.text2 }}>{'NFT'}</TYPE.label>
            <TYPE.label style={{ width: '30%', color: theme.text2, textAlign: 'center' }}>{'Fulfilled'}</TYPE.label>
          </Row>
          <Break />
        </>
        {props.nfts ? (
          props.nfts.map((nft: any, index: number) => {
            return <DataRow key={index} number={index + 1} first={nft.token} second={nft.amount > 0 ? '✅' : '❌'} />
          })
        ) : (
          <div>loading</div>
        )}
      </DarkGreyCard>
    </TableWrapper>
  )
}
export default NftTable
