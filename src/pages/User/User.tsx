import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { TYPE } from 'theme'
import { DarkGreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import BalanceTable from 'components/BalanceTable'
import { Type } from 'react-feather'
import { formatDollarAmount } from 'utils/numbers'

interface RouteParams {
  address: string
}
const ACCOUNTS_URL = 'https://api.badger.finance/v2/accounts/'

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

const SideWrapper = styled.div`
  height: 50%;
`
const User = () => {
  const { address } = useParams<RouteParams>()
  const [accountData, setAccountData] = useState()
  const [value, setValue] = useState(0)
  const [boost, setBoost] = useState(0)
  const [boostRank, setBoostRank] = useState(0)
  useEffect(() => {
    const fetchData = async () => {
      const url = `${ACCOUNTS_URL}/${address}?chain=eth`
      const result = await fetch(url)
      const json = await result.json()
      const balances = json.balances.map((b: any) => {
        let multiplier = json.multipliers[b.id]
        if (!multiplier) {
          multiplier = 0
        }
        return {
          assetName: b.name,
          value: b.value,
          balance: b.balance,
          multiplier: multiplier,
        }
      })
      console.log(balances)

      setValue(json.value)
      setBoost(json.boost)
      setBoostRank(json.boostRank)
      setAccountData(balances)
    }

    fetchData()
  }, [])
  return (
    <PageWrapper>
      <AutoColumn gap="10px">
        <TYPE.largeHeader>
          <TitleWrapper>{`User Analytics for ${address}`}</TitleWrapper>
        </TYPE.largeHeader>
        <ContentLayout>
          <DataWrapper>
            <SideWrapper>
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
            </SideWrapper>
            <SideWrapper>
              <DarkGreyCard>
                <AutoColumn gap="5px">
                  <TYPE.mediumHeader>Total Assets</TYPE.mediumHeader>
                  <AutoColumn gap="10px">
                    <AutoColumn gap="5px">
                      <TYPE.main>Assets in $</TYPE.main>
                      <TYPE.label fontSize="20px">{formatDollarAmount(value)}</TYPE.label>
                    </AutoColumn>
                    <AutoColumn gap="5px">
                      <TYPE.main>Assets in ₿</TYPE.main>
                      <TYPE.label fontSize="20px">1.58</TYPE.label>
                    </AutoColumn>
                    <AutoColumn gap="5px">
                      <TYPE.main>Assets in Ξ</TYPE.main>
                      <TYPE.label fontSize="20px">2.58</TYPE.label>
                    </AutoColumn>
                  </AutoColumn>
                </AutoColumn>
              </DarkGreyCard>
            </SideWrapper>
          </DataWrapper>

          <DarkGreyCard>
            <BalanceTable accountData={accountData} />
          </DarkGreyCard>
        </ContentLayout>
      </AutoColumn>
    </PageWrapper>
  )
}

export default User
