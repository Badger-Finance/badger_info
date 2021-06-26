import BadgerBoosts from './BadgerBoosts'
import React, { useState, useMemo, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { ExtraSmallOnly, HideExtraSmall, TYPE } from 'theme'
import { DarkGreyCard } from 'components/Card'
import Loader, { LoadingRows } from 'components/Loader'
import { AutoColumn } from 'components/Column'
import { formatDollarAmount } from 'utils/numbers'
import { Label, ClickableText } from 'components/Text'
import { PageButtons, Arrow, Break } from 'components/shared'
import useTheme from 'hooks/useTheme'
import { Link } from 'react-router-dom'

const ResponsiveGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  align-items: center;

  grid-template-columns: 20px 3fr repeat(4, 1fr);

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

const LinkWrapper = styled(Link)`
  text-decoration: none;
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

const PageWrapper = styled.div`
  width: 80%;
`

const AddressLabel = styled(Label)`
  display: inline-block;
`

interface BoostData {
  address: string
  boost: number
  stakeRatio: number
  nftMultiplier: number
  nativeBalance: number
  nonNativeBalance: number
}
const DataRow = ({ boostData, index }: { boostData: BoostData; index: number }) => {
  return (
    <LinkWrapper to={'/user/' + boostData.address}>
      <ResponsiveGrid>
        <Label>{index + 1}</Label>
        <AddressLabel>{boostData.address}</AddressLabel>
        <Label end={1} fontWeight={400}>
          {boostData.boost.toFixed(6)}
        </Label>
        <Label end={1} fontWeight={400}>
          {boostData.stakeRatio.toFixed(2)}
        </Label>
        <Label end={1} fontWeight={400}>
          {formatDollarAmount(boostData.nonNativeBalance)}
        </Label>
        <Label end={1} fontWeight={400}>
          {formatDollarAmount(boostData.nativeBalance)}
        </Label>
      </ResponsiveGrid>
    </LinkWrapper>
  )
}

function BoostsToArray(boosts: any): Array<BoostData> {
  const boostArray: Array<BoostData> = []
  for (const item of Object.entries(boosts)) {
    const address = item[0]
    const data: any = item[1]
    boostArray.push({
      address: address,
      boost: data.boost,
      stakeRatio: data.stakeRatio,
      nftMultiplier: data.nftMultiplier,
      nativeBalance: data.nativeBalance,
      nonNativeBalance: data.nonNativeBalance,
    })
  }
  return boostArray
}

const SORT_FIELD = {
  address: 'name',
  boost: 'boost',
  stakeRatio: 'stakeRatio',
  nftMultiplier: 'nftMultiplier',
  nativeBalance: 'nativeBalance',
  nonNativeBalance: 'nonNativeBalance',
}
const BoostsInfo = () => {
  // for sorting
  const maxAmount = 300
  const [sortField, setSortField] = useState(SORT_FIELD.boost)
  const [sortDirection, setSortDirection] = useState<boolean>(true)
  const theme = useTheme()

  const handleSort = useCallback(
    (newField: string) => {
      setSortField(newField)
      setSortDirection(sortField !== newField ? true : !sortDirection)
    },
    [sortDirection, sortField]
  )
  const boosts = BoostsToArray(BadgerBoosts.userData)
  const sortedBoosts = useMemo(() => {
    return boosts
      .sort((a, b) => {
        if (a && b) {
          return a[sortField as keyof BoostData] > b[sortField as keyof BoostData]
            ? (sortDirection ? -1 : 1) * 1
            : (sortDirection ? -1 : 1) * -1
        } else {
          return -1
        }
      })
      .slice(0, maxAmount)
  }, [sortDirection, sortField])

  const arrow = useCallback(
    (field: string) => {
      return sortField === field ? (!sortDirection ? '↑' : '↓') : ''
    },
    [sortDirection, sortField]
  )
  return (
    <PageWrapper>
      <AutoColumn gap="20px">
        <TYPE.largeHeader>Boost Analytics</TYPE.largeHeader>
        <TYPE.mediumHeader>Only {maxAmount} records shown for performance reasons</TYPE.mediumHeader>
        <DarkGreyCard>
          {sortedBoosts.length > 0 ? (
            <AutoColumn gap="16px">
              <ResponsiveGrid>
                <Label color={theme.text2}>#</Label>
                <ClickableText color={theme.text2} onClick={() => handleSort(SORT_FIELD.address)}>
                  Address
                </ClickableText>
                <ClickableText color={theme.text2} end={1} onClick={() => handleSort(SORT_FIELD.boost)}>
                  Boost {arrow(SORT_FIELD.boost)}
                </ClickableText>
                <ClickableText color={theme.text2} end={1} onClick={() => handleSort(SORT_FIELD.stakeRatio)}>
                  Stake Ratio {arrow(SORT_FIELD.stakeRatio)}
                </ClickableText>
                {/* <ClickableText end={1} onClick={() => handleSort(SORT_FIELD.priceUSDChangeWeek)}>
            7d {arrow(SORT_FIELD.priceUSDChangeWeek)}
          </ClickableText> */}
                <ClickableText color={theme.text2} end={1} onClick={() => handleSort(SORT_FIELD.nonNativeBalance)}>
                  Non Native $ {arrow(SORT_FIELD.nonNativeBalance)}
                </ClickableText>
                <ClickableText color={theme.text2} end={1} onClick={() => handleSort(SORT_FIELD.nativeBalance)}>
                  Native $ {arrow(SORT_FIELD.nativeBalance)}
                </ClickableText>
                {/* <ClickableText color={theme.text2} end={1} onClick={() => handleSort(SORT_FIELD.nftMultiplier)}>
                NFT Multiplier {arrow(SORT_FIELD.nftMultiplier)}
              </ClickableText> */}
              </ResponsiveGrid>

              <Break />
              {sortedBoosts.map((data, i) => {
                if (data) {
                  return (
                    <React.Fragment key={i}>
                      <DataRow index={i} boostData={data} />
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
export default BoostsInfo
