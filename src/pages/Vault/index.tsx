import React from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import { useSettByAddress } from 'state/setts/hooks'
import { TYPE } from 'theme'
import { DarkGreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'

interface RouteParams {
  vaultAddress: string
}
const PageWrapper = styled.div`
  width: 60%;
`
const CardRow = styled.div`
  display: flex;
  flex-direction: row;
`
// TVL, Apy, PPfs, harvests/deposits/withdrawals, whales, num users, current strategy/amount of rewards pending
const Vault = () => {
  const { vaultAddress } = useParams<RouteParams>()
  const sett = useSettByAddress(vaultAddress)
  return (
    <PageWrapper>
      <AutoColumn gap="20px">
        <TYPE.largeHeader style={{ textAlign: 'center' }}>{sett?.name}</TYPE.largeHeader>
        <CardRow>
          <DarkGreyCard style={{ margin: '5px', width: '300px' }}>
            <AutoColumn gap="15px">
              <TYPE.mediumHeader>Rewards Breakdown</TYPE.mediumHeader>
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
            </AutoColumn>
          </DarkGreyCard>
          <DarkGreyCard style={{ width: '30%', margin: '5px' }}></DarkGreyCard>
          <DarkGreyCard style={{ width: '30%', margin: '5px' }}></DarkGreyCard>
        </CardRow>
      </AutoColumn>
    </PageWrapper>
  )
}
export default Vault
