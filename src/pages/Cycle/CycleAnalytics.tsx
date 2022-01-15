import React, { useState, useEffect, useMemo } from 'react'
import { DarkGreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import { AutoRow } from 'components/Row'
import styled from 'styled-components'
import { TYPE } from 'theme'
import { ButtonPrimary } from 'components/Button'
import { Link, useParams } from 'react-router-dom'
import RewardsBarChart from 'components/RewardsBarChart'
import { useCycleData, useCycleError, useHarvestData } from 'state/cycle/hooks'
import tokens from 'constants/tokens'
import { sumTokenDist, tokenDistToChart } from 'utils/tokenDist'
import { ChartData } from 'utils/tokenDist'
import { formatBalanceAmount } from 'utils/numbers'
import { calcTimeBetweenBlocks, dateToString } from 'utils/time'
import { useSetts } from 'state/setts/hooks'
import TreeDistributionsChart from 'components/TreeDistributions'
import { fetchHarvests } from 'data/cycles'
import { Type } from 'react-feather'
import { EXPLORER_URL } from 'data/urls'
import { isAddress } from 'utils'
interface RouteParams {
  cycleNumber: string
}

const ContentLayout = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-gap: 1em;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`
const TreeDistributions = styled.div`
  margin-top: 16px;
  height: 400px;
  margin-right: 10px;
  padding-bottom: 100px;
`
const PageWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
`

const CenteredHeader = styled.div`
  text-align: center;
`
const LinkWrapper = styled(Link)`
  color: white;
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`
export const HarvestData = (props: any) => {
  return (
    <AutoColumn gap="20px" style={{ width: '50%', margin: '0 auto' }}>
      {props.harvests.map((h: any) => {
        const id = h.id.split('-')[0]
        return (
          <DarkGreyCard key={h.id}>
            <AutoColumn gap="5px">
              <TYPE.main>Amount</TYPE.main>
              <TYPE.label>{(h.amount / 1e18).toFixed(3)}</TYPE.label>
              <TYPE.main>Token</TYPE.main>
              <TYPE.label>{h.token.symbol}</TYPE.label>
              <TYPE.main>Sett</TYPE.main>
              <TYPE.label>
                <LinkWrapper to={`/vaults/${isAddress(h.sett.id)}`}>{h.sett.name}</LinkWrapper>
              </TYPE.label>
              <TYPE.main>Block</TYPE.main>
              <TYPE.label>{h.blockNumber}</TYPE.label>
              <TYPE.main>TX</TYPE.main>
              <TYPE.label>
                <a target="_blank" rel="noreferrer" href={`${EXPLORER_URL}/tx/${id}`}>
                  {id}
                </a>
              </TYPE.label>
            </AutoColumn>
          </DarkGreyCard>
        )
      })}
    </AutoColumn>
  )
}

const CycleAnalytics = () => {
  const cycleNumber = Number(useParams<RouteParams>().cycleNumber)
  const [selected, setSelected] = useState('Badger')
  const [timeBetweenBlocks, setTimeBetweenBlocks] = useState('0')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const cycleData = useCycleData(cycleNumber)
  const cycleError = useCycleError(cycleNumber)
  const allHarvests = useHarvestData()
  const harvests = allHarvests.filter(
    (h: any) => h.blockNumber < cycleData.endBlock && h.blockNumber > cycleData.startBlock
  )
  const setts = useSetts()
  const settNames: any = {}
  setts.forEach((sett) => {
    settNames[sett.vaultToken] = sett.name
  })

  useEffect(() => {
    async function fetchTimes() {
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
      fetchTimes()
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
                <TYPE.mediumHeader>Harvests</TYPE.mediumHeader>
                <HarvestData harvests={harvests}></HarvestData>

                <AutoRow gap="10px"></AutoRow>
              </AutoColumn>
            </DarkGreyCard>
          </ContentLayout>
        </PageWrapper>
      )}
    </>
  )
}
export default CycleAnalytics
