import React from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import { useSettByAddress, useVaultData } from 'state/setts/hooks'
import { TYPE } from 'theme'
import { DarkGreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import { formatDollarAmount } from 'utils/numbers'
import Whales from 'components/Whales'
import Harvests from 'components/Harvests'
import { Deposits, Withdrawals } from 'components/Transfers'
interface RouteParams {
  vaultAddress: string
}
const PageWrapper = styled.div`
  width: 75%;
`
const CardRow = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 1000px) {
    flex-wrap: wrap;
  }
  justify-content: space-betweeen;
`

const AprWrapper = styled.div``

// TVL, PPfs, harvests/deposits/withdrawals, whales, num users, current strategy/amount of rewards pending
const Vault = () => {
  const { vaultAddress } = useParams<RouteParams>()
  const sett = useSettByAddress(vaultAddress)
  const vaultData = useVaultData(vaultAddress)
  const total = sett?.sources.reduce(
    (acc: any, curr: any) => {
      if (!curr.boostable) {
        acc[0] += curr.minApr
        acc[1] += curr.minApr
      } else {
        acc[0] += curr.minApr
        acc[1] += curr.maxApr
      }
      return acc
    },
    [0, 0]
  )
  return (
    <PageWrapper>
      <AutoColumn gap="20px">
        <TYPE.largeHeader style={{ textAlign: 'center' }}>{sett?.name}</TYPE.largeHeader>
        <CardRow>
          <DarkGreyCard style={{ margin: '5px', minWidth: '200px' }}>
            <AutoColumn gap="15px">
              <TYPE.mediumHeader>APR Breakdown</TYPE.mediumHeader>
              {sett &&
                sett?.sources.map((s) => {
                  return (
                    <AutoColumn key={s.name} gap="5px">
                      <TYPE.main>{s.name}</TYPE.main>
                      <TYPE.label>
                        {s.boostable ? `${s.minApr.toFixed(2)}% - ${s.maxApr.toFixed(2)}%` : `${s.minApr.toFixed(2)}%`}
                      </TYPE.label>
                    </AutoColumn>
                  )
                })}
              {sett && (
                <AutoColumn gap="5px">
                  <TYPE.main>Total</TYPE.main>
                  <TYPE.label>
                    {total[0] != total[1]
                      ? `${total[0].toFixed(2)}% - ${total[1].toFixed(2)}%`
                      : `${total[0].toFixed(2)}%`}
                  </TYPE.label>
                </AutoColumn>
              )}
            </AutoColumn>
          </DarkGreyCard>
          <DarkGreyCard style={{ minWidth: '150px', margin: '5px' }}>
            <AutoColumn gap="15px">
              <TYPE.mediumHeader>Vault Stats</TYPE.mediumHeader>
              <AutoColumn gap="5px">
                <TYPE.main>TVL</TYPE.main>
                <TYPE.label>{formatDollarAmount(sett?.tvl)}</TYPE.label>
              </AutoColumn>
              <AutoColumn gap="5px">
                <TYPE.main>Price Per Full Share</TYPE.main>
                <TYPE.label>{sett && sett?.ppfs.toFixed(3)}</TYPE.label>
              </AutoColumn>
            </AutoColumn>
          </DarkGreyCard>
          <DarkGreyCard style={{ margin: '5px' }}>
            <AutoColumn gap="15px">
              <TYPE.mediumHeader>Strategy Info</TYPE.mediumHeader>
              <AutoColumn gap="5px">
                <TYPE.main>Current Strategy</TYPE.main>
                <TYPE.label>{vaultData?.strategy ? vaultData.strategy.address : 'Loading...'}</TYPE.label>
              </AutoColumn>
              <AutoColumn gap="5px">
                <TYPE.main>Total Earnings</TYPE.main>
                <TYPE.label>{vaultData?.strategy ? vaultData.strategy.totalEarnings : 'Loading...'}</TYPE.label>
              </AutoColumn>
              <AutoColumn gap="5px">
                <TYPE.main>Total Harvests</TYPE.main>
                <TYPE.label>{vaultData?.strategy ? vaultData.strategy.numHarvests : 'Loading...'}</TYPE.label>
              </AutoColumn>
            </AutoColumn>
          </DarkGreyCard>
        </CardRow>
        <DarkGreyCard style={{ margin: '5px' }}>
          <TYPE.mediumHeader>Harvests</TYPE.mediumHeader>
          <Harvests vaultAddress={vaultAddress} />
        </DarkGreyCard>
        <DarkGreyCard style={{ margin: '5px' }}>
          <TYPE.mediumHeader>Whales</TYPE.mediumHeader>
          <Whales vaultAddress={vaultAddress} />
        </DarkGreyCard>
        <DarkGreyCard style={{ margin: '5px' }}>
          <TYPE.mediumHeader>Recent Deposits</TYPE.mediumHeader>
          <Deposits vaultAddress={vaultAddress} />
        </DarkGreyCard>
        <DarkGreyCard style={{ margin: '5px' }}>
          <TYPE.mediumHeader>Recent Withdrawals</TYPE.mediumHeader>
          <Withdrawals vaultAddress={vaultAddress} />
        </DarkGreyCard>
      </AutoColumn>
    </PageWrapper>
  )
}
export default Vault
