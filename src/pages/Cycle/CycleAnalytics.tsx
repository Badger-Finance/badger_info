import React, { useState, useEffect, useMemo } from 'react'
import { DarkGreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import { AutoRow } from 'components/Row'
import styled from 'styled-components'
import { TYPE } from 'theme'
import { ButtonPrimary } from 'components/Button'
import { useParams } from 'react-router-dom'
import RewardsBarChart from 'components/RewardsBarChart'
import { useCycleData, useCycleError } from 'state/cycle/hooks'
import tokens from 'constants/tokens'
import { sumTokenDist, tokenDistToChart } from 'utils/tokenDist'
import { ChartData } from 'utils/tokenDist'
import { formatBalanceAmount } from 'utils/numbers'
import { calcTimeBetweenBlocks, dateToString } from 'utils/time'
interface RouteParams {
  cycleNumber: string
}

const ContentLayout = styled.div`
  margin-top: 16px;
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-gap: 1em;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`

const PageWrapper = styled.div`
  width: 90%;
`

const CenteredHeader = styled.div`
  text-align: center;
`
const SmallButton = styled.div`
  width: 100px;
  whitespace: normal;
`

const ChartWrapper = styled.div`
  height: 400px;
`
interface SumRewards {
  token: string
  amount: number
}

const CycleAnalytics = () => {
  const cycleNumber = Number(useParams<RouteParams>().cycleNumber)
  const [selected, setSelected] = useState('Badger')
  const [timeBetweenBlocks, setTimeBetweenBlocks] = useState('0')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const cycleData = useCycleData(cycleNumber)
  const cycleError = useCycleError(cycleNumber)
  const totalRewards = useMemo(() => {
    const { totalTokenDist } = cycleData || {}
    return sumTokenDist(totalTokenDist) as Array<SumRewards>
  }, [cycleData])
  const chartData = useMemo(() => {
    const { totalTokenDist } = cycleData || {}
    return tokenDistToChart(totalTokenDist) as ChartData
  }, [cycleData])
  useEffect(() => {
    async function fetch() {
      const { error, data } = await calcTimeBetweenBlocks(cycleData.startBlock, cycleData.endBlock)
      if (data.diff) {
        setTimeBetweenBlocks(data?.diff)
      }
      if (data.startDate) {
        setStartDate(data.startDate)
      }
      if (data.endDate) {
        setEndDate(data.endDate)
      }
    }
    if (cycleData) {
      fetch()
    }
  }, [cycleData])

  return (
    <>
      {cycleError === true ? (
        <div>No data available for cycle {cycleNumber}</div>
      ) : (
        <PageWrapper>
          <CenteredHeader>
            <TYPE.largeHeader>Cycle {cycleNumber}</TYPE.largeHeader>
          </CenteredHeader>
          <ContentLayout>
            <DarkGreyCard>
              <AutoColumn gap="17.5px">
                <TYPE.mediumHeader>Total Rewards</TYPE.mediumHeader>
                {totalRewards.length > 0 &&
                  totalRewards.map((element) => {
                    console.log(element)
                    if (tokens[element.token] == 'Badger') {
                      element.amount = element.amount / 10
                      console.log(element.amount)
                    }
                    return (
                      <AutoColumn key={tokens[element.token]} gap="7.5px">
                        <TYPE.main fontWeight={400}>{tokens[element.token]} Rewards</TYPE.main>
                        <TYPE.label>{formatBalanceAmount(element.amount)}</TYPE.label>
                      </AutoColumn>
                    )
                  })}
                <TYPE.mediumHeader>Cycle Info</TYPE.mediumHeader>
                <AutoColumn gap="10px">
                  <TYPE.main>Start Block</TYPE.main>
                  <TYPE.label>{cycleData && cycleData.startBlock}</TYPE.label>
                  <TYPE.small>{startDate.toUTCString()}</TYPE.small>
                  <TYPE.main>End Block</TYPE.main>
                  <TYPE.label>{cycleData && cycleData.endBlock}</TYPE.label>
                  <TYPE.small>{endDate.toUTCString()}</TYPE.small>

                  <TYPE.main>Cycle Length</TYPE.main>
                  <TYPE.label>{cycleData && timeBetweenBlocks}</TYPE.label>
                </AutoColumn>
              </AutoColumn>
            </DarkGreyCard>
            <DarkGreyCard>
              <AutoColumn gap="10px">
                <TYPE.mediumHeader> Rewards per Sett</TYPE.mediumHeader>
                <AutoRow gap="10px">
                  {totalRewards.map((element) => {
                    return (
                      <SmallButton key={tokens[element.token]}>
                        <ButtonPrimary
                          onClick={() => setSelected(tokens[element.token])}
                          bgColor={tokens[element.token] == selected ? 'blue' : 'grey'}
                        >
                          {tokens[element.token]}
                        </ButtonPrimary>
                      </SmallButton>
                    )
                  })}
                </AutoRow>
              </AutoColumn>
              <ChartWrapper>
                <RewardsBarChart data={chartData[selected]} />
              </ChartWrapper>
            </DarkGreyCard>
          </ContentLayout>
        </PageWrapper>
      )}
    </>
  )
}
export default CycleAnalytics
