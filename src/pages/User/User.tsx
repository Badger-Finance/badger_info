import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { TYPE } from 'theme'
import { DarkGreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import BalanceTable from 'components/BalanceTable'
import { formatDollarAmount } from 'utils/numbers'
import { useAccountData } from 'state/accounts/hooks'
import { usePrices } from 'hooks/usePricing'
import NftTable from 'components/NftTable'
import { ClaimedTable, ClaimableTable } from 'components/ClaimableTable'
import { useNftScoresData } from 'state/accounts/hooks'
import { useUserBoostData } from 'state/boosts/hooks'
import { EXPLORER_URL } from 'data/urls'

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

const BoostWrapper = styled.div``
const AssetWrapper = styled.div`
  height: 44%;
`

const EtherscanLink = styled.a`
  color: white;
`

const ScoreWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`

const User = () => {
  const { address } = useParams<RouteParams>()
  const accountData = useAccountData(address)
  const prices = usePrices()
  const {
    boost = 0,
    boostRank = 0,
    netWorth = 0,
    balances = [],
    nativeBalance = 0,
    nonNativeBalance = 0,
    nftBalance = 0,
    stakeRatio = 0,
  } = accountData || {}
  const nfts = useNftScoresData(address)
  const boostData = useUserBoostData(address)

  const isAccountData = Object.keys(accountData?.balances || { a: 'a' }).length > 0

  return (
    <>
      {!isAccountData ? (
        <div> No account data for {address}</div>
      ) : (
        <PageWrapper>
          <AutoColumn gap="10px">
            <TYPE.largeHeader>
              <TitleWrapper>
                {'User Analytics for '}
                <EtherscanLink href={`${EXPLORER_URL}address/${address}`} target="_blank">
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
                          <TYPE.main>Stake Ratio</TYPE.main>
                          <TYPE.label fontSize="20px">{nonNativeBalance ? stakeRatio.toFixed(3) : '0'}</TYPE.label>
                        </AutoColumn>
                        <AutoColumn gap="5px">
                          <TYPE.main>Native Balance</TYPE.main>
                          <TYPE.label fontSize="20px">{formatDollarAmount(nativeBalance)}</TYPE.label>
                        </AutoColumn>
                        <AutoColumn gap="5px">
                          <TYPE.main>Non Native Balance</TYPE.main>
                          <TYPE.label fontSize="20px">{formatDollarAmount(nonNativeBalance)}</TYPE.label>
                        </AutoColumn>
                        <AutoColumn gap="5px">
                          <TYPE.main>Nft Balance</TYPE.main>
                          <TYPE.label fontSize="20px">{formatDollarAmount(nftBalance)}</TYPE.label>
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
                <BalanceTable balanceData={balances} isLoaded={netWorth > 0} />
              </DarkGreyCard>
            </ContentLayout>
            <ScoreWrapper>
              <ClaimedTable address={address} claimable={accountData?.claimedBalances} />
              <ClaimableTable address={address} claimable={accountData?.claimableBalances} />
            </ScoreWrapper>
          </AutoColumn>
        </PageWrapper>
      )}
    </>
  )
}

export default User
