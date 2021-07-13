import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { TYPE } from 'theme'
import { DarkGreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import { PageButtons, Arrow, Break } from 'components/shared'
import useTheme from 'hooks/useTheme'
import { useNftScoresData, useScoreData } from 'state/accounts/hooks'

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
  return (
    <>
      <Row>
        <TYPE.label style={{ width: '10%' }}>{props.number}</TYPE.label>
        <TYPE.label style={{ width: '60%', wordBreak: 'break-word' }}>{props.first}</TYPE.label>
        <TYPE.label style={{ width: '30%', textAlign: 'center' }}>{props.second}</TYPE.label>
      </Row>
      <Break />
    </>
  )
}

const NftTable = (props: { address: string }) => {
  const nftScores = useNftScoresData(props.address)
  const nfts = nftScores?.nfts || []
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
        {nfts ? (
          nfts.map((nft, index) => {
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
