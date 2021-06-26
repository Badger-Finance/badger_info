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
import { Square } from 'react-feather'

const ResponsiveGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  align-items: center;

  grid-template-columns: 20px 3fr repeat(3, 1fr);

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
const SORT_FIELD = {
  assetName: 'assetName',
  balance: 'balance',
  value: 'value',
  multiplier: 'multiplier',
}
interface AccountData {
  assetName: string
  balance: number
  value: number
  multiplier: number
}

const AddressLabel = styled(Label)`
  display: inline-block;
`
const LinkWrapper = styled(Link)`
  text-decoration: none;
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

const DataRow = ({ accountData, index }: { accountData: AccountData; index: number }) => {
  return (
    <LinkWrapper to={''}>
      <ResponsiveGrid>
        <Label>{index + 1}</Label>
        <AddressLabel>{accountData.assetName}</AddressLabel>
        <Label end={2} fontWeight={400}>
          {accountData.balance.toFixed(6)}
        </Label>
        <Label end={2} fontWeight={400}>
          {accountData.multiplier.toFixed(2)}
        </Label>
        <Label end={2} fontWeight={400}>
          {formatDollarAmount(accountData.value)}
        </Label>
      </ResponsiveGrid>
    </LinkWrapper>
  )
}
const BalanceTable = (props: any) => {
  const theme = useTheme()
  const [sortField, setSortField] = useState(SORT_FIELD.balance)
  const [sortDirection, setSortDirection] = useState<boolean>(true)
  const handleSort = useCallback(
    (newField: string) => {
      setSortField(newField)
      setSortDirection(sortField !== newField ? true : !sortDirection)
    },
    [sortDirection, sortField]
  )
  const sortedAccountData = useMemo(() => {
    if (!props.accountData) {
      return []
    }
    return props.accountData.sort((a: any, b: any) => {
      if (a && b) {
        return a[sortField as keyof AccountData] > b[sortField as keyof AccountData]
          ? (sortDirection ? -1 : 1) * 1
          : (sortDirection ? -1 : 1) * -1
      } else {
        return -1
      }
    })
  }, [sortDirection, sortField, props.accountData])

  const arrow = useCallback(
    (field: string) => {
      return sortField === field ? (!sortDirection ? '↑' : '↓') : ''
    },
    [sortDirection, sortField]
  )
  return (
    <AutoColumn gap="10px">
      <ResponsiveGrid>
        <Label color={theme.text2}>#</Label>
        <ClickableText color={theme.text2} onClick={() => handleSort(SORT_FIELD.assetName)}>
          Asset
        </ClickableText>
        <ClickableText color={theme.text2} end={1} onClick={() => handleSort(SORT_FIELD.balance)}>
          Balance {arrow(SORT_FIELD.balance)}
        </ClickableText>
        <ClickableText color={theme.text2} end={1} onClick={() => handleSort(SORT_FIELD.multiplier)}>
          Multiplier {arrow(SORT_FIELD.multiplier)}
        </ClickableText>
        <ClickableText color={theme.text2} end={1} onClick={() => handleSort(SORT_FIELD.value)}>
          Value {arrow(SORT_FIELD.value)}
        </ClickableText>
      </ResponsiveGrid>
      <Break />
      {sortedAccountData.map((data: any, i: any) => {
        if (data) {
          return (
            <React.Fragment key={i}>
              <DataRow index={i} accountData={data} />
              <Break />
            </React.Fragment>
          )
        }
        return null
      })}
    </AutoColumn>
  )
}
export default BalanceTable
