import React, { useState, useMemo, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { Button, ExtraSmallOnly, HideExtraSmall, TYPE } from 'theme'
import { DarkGreyCard } from 'components/Card'
import Loader, { LoadingRows } from 'components/Loader'
import { AutoColumn } from 'components/Column'
import { formatDollarAmount } from 'utils/numbers'
import { Label, ClickableText } from 'components/Text'
import { PageButtons, Arrow, Break } from 'components/shared'
import useTheme from 'hooks/useTheme'
import { Link } from 'react-router-dom'
import { useBoostData } from 'state/boosts/hooks'
import { ButtonPrimary } from 'components/Button'
import { CSVLink, CSVDownload } from 'react-csv'
import { AddressLabel, LinkWrapper, PageWrapper, ButtonWrapper } from 'pages/Boosts/BoostsInfo'
import { useEarningsData, useSettByAddress, useSetts } from 'state/setts/hooks'
const ResponsiveGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  align-items: center;

  grid-template-columns: 20px 3fr repeat(5, 1fr);

  @media screen and (max-width: 900px) {
    grid-template-columns: 20px 1.5fr repeat(3, 1fr);
    & :nth-child(4) {
      display: none;
    }
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: 20px 1.5fr repeat(2, 1fr);
    & :nth-child(6) {
      display: none;
    }
  }

  @media screen and (max-width: 670px) {
    grid-template-columns: repeat(2, 1fr);
    > *:first-child {
      display: none;
    }
    > *:nth-child(3) {
      display: none;
    }
  }
`

interface EarningsInfo {
  vault: string
  yield: number
  tvl: number
  yearlyRevenue: number
  maintenanceCost: number
  grossProfit: number
}
const DataRow = ({ earningsInfo, index }: { earningsInfo: EarningsInfo; index: number }) => {
  let negativeProfit = ''
  if (earningsInfo.grossProfit < 0) {
    negativeProfit = '-'
  }
  return (
    <LinkWrapper to={'/vaults'}>
      <ResponsiveGrid>
        <Label>{index + 1}</Label>
        <AddressLabel>{earningsInfo.vault}</AddressLabel>
        <Label end={1} fontWeight={400}>
          {Number(earningsInfo.yield).toFixed(6)}
        </Label>
        <Label end={1} fontWeight={400}>
          {formatDollarAmount(earningsInfo.tvl)}
        </Label>
        <Label end={1} fontWeight={400}>
          {formatDollarAmount(earningsInfo.yearlyRevenue)}
        </Label>
        <Label end={1} fontWeight={400}>
          {formatDollarAmount(earningsInfo.maintenanceCost)}
        </Label>
        <Label end={1} fontWeight={400}>
          {`${negativeProfit}${formatDollarAmount(Math.abs(earningsInfo.grossProfit))}`}
        </Label>
      </ResponsiveGrid>
    </LinkWrapper>
  )
}

const SORT_FIELD = {
  vault: 'name',
  yield: 'yield',
  tvl: 'tvl',
  yearlyRevenue: 'yearlyRevenue',
  maintenanceCost: 'maintenanceCost',
  grossProfit: 'grossProfit',
}
const EarningsInfo = () => {
  const [sortField, setSortField] = useState(SORT_FIELD.tvl)
  const [sortDirection, setSortDirection] = useState<boolean>(true)
  const earningsData = useEarningsData()
  const theme = useTheme()

  const handleSort = useCallback(
    (newField: string) => {
      setSortField(newField)
      setSortDirection(sortField !== newField ? true : !sortDirection)
    },
    [sortDirection, sortField]
  )
  const sortedEarningsData = useMemo(() => {
    return earningsData.slice().sort((a, b) => {
      if (a && b) {
        return a[sortField as keyof EarningsInfo] > b[sortField as keyof EarningsInfo]
          ? (sortDirection ? -1 : 1) * 1
          : (sortDirection ? -1 : 1) * -1
      } else {
        return -1
      }
    })
  }, [sortDirection, sortField, earningsData])

  const arrow = useCallback(
    (field: string) => {
      return sortField === field ? (!sortDirection ? '↑' : '↓') : ''
    },
    [sortDirection, sortField]
  )
  return (
    <PageWrapper>
      <AutoColumn gap="20px">
        <TYPE.largeHeader>Earnings Analytics</TYPE.largeHeader>
        <DarkGreyCard>
          {sortedEarningsData.length > 0 ? (
            <AutoColumn gap="16px">
              <ResponsiveGrid>
                <Label color={theme.text2}>#</Label>
                <ClickableText color={theme.text2} onClick={() => handleSort(SORT_FIELD.vault)}>
                  Vault
                </ClickableText>
                <ClickableText color={theme.text2} end={1} onClick={() => handleSort(SORT_FIELD.yield)}>
                  Base Yield {arrow(SORT_FIELD.yield)}
                </ClickableText>
                <ClickableText color={theme.text2} end={1} onClick={() => handleSort(SORT_FIELD.tvl)}>
                  TVL {arrow(SORT_FIELD.tvl)}
                </ClickableText>
                <ClickableText color={theme.text2} end={1} onClick={() => handleSort(SORT_FIELD.yearlyRevenue)}>
                  Yearly Revenue {arrow(SORT_FIELD.yearlyRevenue)}
                </ClickableText>
                <ClickableText color={theme.text2} end={1} onClick={() => handleSort(SORT_FIELD.maintenanceCost)}>
                  Maintenance {arrow(SORT_FIELD.maintenanceCost)}
                </ClickableText>
                <ClickableText color={theme.text2} end={1} onClick={() => handleSort(SORT_FIELD.grossProfit)}>
                  Gross Profit {arrow(SORT_FIELD.grossProfit)}
                </ClickableText>
              </ResponsiveGrid>

              <Break />
              {earningsData.length > 0 &&
                sortedEarningsData.map((data, i) => {
                  if (data) {
                    return (
                      <React.Fragment key={i}>
                        <DataRow index={i} earningsInfo={data} />
                        <Break />
                      </React.Fragment>
                    )
                  }
                  return null
                })}
            </AutoColumn>
          ) : (
            <LoadingRows>
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
            </LoadingRows>
          )}
        </DarkGreyCard>
      </AutoColumn>
    </PageWrapper>
  )
}
export default EarningsInfo
