import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { TYPE } from 'theme'
import { DarkGreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import BalanceTable from 'components/BalanceTable'
import { formatDollarAmount } from 'utils/numbers'
import { useAccountData, useUpdateAccountData } from 'state/accounts/hooks'
import { fetchAccountData } from 'data/accounts/index'
import { usePrices } from 'hooks/usePricing'
import ScoreTable from 'components/Score'

interface RouteParams {
  address: string
}

const PageWrapper = styled.div`
  width: 70%;
`
const TitleWrapper = styled.div`
  word-wrap: break-word;
`
const ContentLayout = styled.div`
  margin-top: 16px;
  height: auto;
  display: flex;
  flex-direction: row;
  grid-gap: 1em;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`
const DataWrapper = styled.div`
  width: 200px;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
  display: flex;
  flex-direction: column;
  grid-gap: 1em;
`

const BoostWrapper = styled.div`
  height: 40%;
`
const AssetWrapper = styled.div`
  height: 60%;
`

const EtherscanLink = styled.a`
  color: white;
`

const User = () => {
  const { address } = useParams<RouteParams>()
  const updateAccountData = useUpdateAccountData(address)
  const accountData = useAccountData(address)
  const prices = usePrices()
  const { boost = 0, boostRank = 0, netWorth = 0, balances = [] } = accountData || {}
  useEffect(() => {
    const fetch = async () => {
      if (!accountData) {
        const { error, data } = await fetchAccountData(address)
        if (!error && data) {
          updateAccountData(data)
        }
      }
    }
    fetch()
  }, [address])
  return (
    <PageWrapper>
      <AutoColumn gap="10px">
        <TYPE.largeHeader>
          <TitleWrapper>
            {'User Analytics for '}
            <EtherscanLink href={`https://etherscan.io/address/${address}`} target="_blank">
              {address}
            </EtherscanLink>
          </TitleWrapper>
        </TYPE.largeHeader>
        <ContentLayout>
          <DataWrapper>
            <BoostWrapper>
              <DarkGreyCard style={{ height: '100%' }}>
                <AutoColumn gap="5px">
                  <TYPE.mediumHeader>Boost Info</TYPE.mediumHeader>
                  <AutoColumn gap="10px">
                    <AutoColumn gap="5px">
                      <TYPE.main>Boost</TYPE.main>
                      <TYPE.label fontSize="20px">{boost.toFixed(4)}</TYPE.label>
                    </AutoColumn>
                    <AutoColumn gap="5px">
                      <TYPE.main>Boost Rank</TYPE.main>
                      <TYPE.label fontSize="20px">{boostRank}</TYPE.label>
                    </AutoColumn>
                  </AutoColumn>
                </AutoColumn>
              </DarkGreyCard>
            </BoostWrapper>
            <AssetWrapper>
              <DarkGreyCard style={{ height: '100%' }}>
                <AutoColumn gap="5px">
                  <TYPE.mediumHeader>Total Assets</TYPE.mediumHeader>
                  <AutoColumn gap="10px">
                    <AutoColumn gap="5px">
                      <TYPE.main>Assets in $</TYPE.main>
                      <TYPE.label fontSize="20px">{formatDollarAmount(netWorth)}</TYPE.label>
                    </AutoColumn>
                    <AutoColumn gap="5px">
                      <TYPE.main>Assets in ₿</TYPE.main>
                      <TYPE.label fontSize="20px">{(netWorth / prices.btc).toFixed(3)}</TYPE.label>
                    </AutoColumn>
                    <AutoColumn gap="5px">
                      <TYPE.main>Assets in Ξ</TYPE.main>
                      <TYPE.label fontSize="20px">{(netWorth / prices.eth).toFixed(3)}</TYPE.label>
                    </AutoColumn>
                  </AutoColumn>
                </AutoColumn>
              </DarkGreyCard>
            </AssetWrapper>
          </DataWrapper>

          <DarkGreyCard>
            <BalanceTable balanceData={balances} />
          </DarkGreyCard>
        </ContentLayout>
        <ScoreTable></ScoreTable>
      </AutoColumn>
    </PageWrapper>
  )
}

export default User
