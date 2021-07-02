import React, { useState, useEffect } from 'react'
import { DarkGreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import { AutoRow } from 'components/Row'
import styled from 'styled-components'
import { TYPE } from 'theme'
import { ButtonPrimary } from 'components/Button'
import { useParams } from 'react-router-dom'
import RewardsBarChart from 'components/RewardsBarChart'
import { useCycleData } from 'state/cycle/hooks'
interface RouteParams {
  cycleNumber: string
}

interface ChartElement {
  name: string
  uv: number
}
interface ChartData {
  [key: string]: Array<ChartElement>
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
  width: 80%;
`

const CenteredHeader = styled.div`
  text-align: center;
`
const SmallButton = styled.div`
  width: 60px;
  whitespace: normal;
`

const ChartWrapper = styled.div`
  height: 500px;
`

const CycleAnalytics = () => {
  const cycleNumber = Number(useParams<RouteParams>().cycleNumber)
  const [selected, setSelected] = useState('Badger')
  const cycleData = useCycleData(cycleNumber)
  console.log(cycleData)
  const totalRewards = [
    {
      token: 'Badger',
      amount: 100,
    },
    {
      token: 'Digg',
      amount: 105,
    },
    {
      token: 'DFD',
      amount: 100,
    },
    {
      token: 'XSushi',
      amount: 100,
    },
    {
      token: `Cvx`,
      amount: 100,
    },
    {
      token: 'cvxCrv',
      amount: 100,
    },
  ]
  const data: ChartData = {
    Badger: [
      {
        name: 'Page A',
        uv: 100,
      },
      {
        name: 'Page B',
        uv: 200,
      },
      {
        name: 'Page C',
        uv: 590,
      },
      {
        name: 'Page D',
        uv: 1780,
      },
      {
        name: 'Page E',
        uv: 1890,
      },
      {
        name: 'Page F',
        uv: 390,
      },
      {
        name: 'Page G',
        uv: 3490,
      },
    ],
    Digg: [
      {
        name: 'Page A',
        uv: 4000,
      },
      {
        name: 'Page B',
        uv: 3000,
      },
      {
        name: 'Page C',
        uv: 2000,
      },
      {
        name: 'Page D',
        uv: 2780,
      },
      {
        name: 'Page E',
        uv: 1890,
      },
      {
        name: 'Page F',
        uv: 2390,
      },
      {
        name: 'Page G',
        uv: 3490,
      },
    ],
  }

  return (
    <PageWrapper>
      <CenteredHeader>
        <TYPE.largeHeader>Cycle {cycleNumber}</TYPE.largeHeader>
      </CenteredHeader>
      <ContentLayout>
        <DarkGreyCard>
          <AutoColumn gap="17.5px">
            <TYPE.mediumHeader>Total Rewards</TYPE.mediumHeader>
            {totalRewards.map((element) => {
              return (
                <AutoColumn key={element.token} gap="7.5px">
                  <TYPE.main fontWeight={400}>{element.token} Rewards</TYPE.main>
                  <TYPE.label fontSize="20px">{element.amount}</TYPE.label>
                  <TYPE.subHeader>${element.amount * 5}</TYPE.subHeader>
                </AutoColumn>
              )
            })}
          </AutoColumn>
        </DarkGreyCard>
        <DarkGreyCard>
          <AutoColumn gap="10px">
            <TYPE.mediumHeader> Rewards per Sett</TYPE.mediumHeader>
            <AutoRow gap="10px">
              {totalRewards.map((element) => {
                return (
                  <SmallButton key={element.token}>
                    <ButtonPrimary
                      onClick={() => setSelected(element.token)}
                      bgColor={element.token == selected ? 'blue' : 'grey'}
                    >
                      {element.token}
                    </ButtonPrimary>
                  </SmallButton>
                )
              })}
            </AutoRow>
          </AutoColumn>
          <ChartWrapper>
            <RewardsBarChart data={data[selected]} />
          </ChartWrapper>
        </DarkGreyCard>
      </ContentLayout>
    </PageWrapper>
  )
}
export default CycleAnalytics
