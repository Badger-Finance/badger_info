import React, { useState, useMemo, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { AutoColumn } from 'components/Column'
import { formatDollarAmount, formatBalanceAmount } from 'utils/numbers'
import { Label, ClickableText } from 'components/Text'
import { PageButtons, Arrow, Break } from 'components/shared'
import useTheme from 'hooks/useTheme'
import { Link } from 'react-router-dom'
import { Balance } from 'state/accounts/reducer'
import { LocalLoader } from 'components/Loader'

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

const LoaderWrapper = styled.div`
  top: 50%;
  margin: 0;
`

export const LoadingRows = (props: any) => {
  return <LoaderWrapper>{!props.isLoaded && <LocalLoader fill={false} />}</LoaderWrapper>
}
const DataRow = (props: { index: number; balanceData: Balance }) => {
  const { index, balanceData } = props
  return (
    <LinkWrapper to={`/vaults/${balanceData.vaultAddress}`}>
      <ResponsiveGrid>
        <Label>{index + 1}</Label>
        <AddressLabel>{balanceData.assetName}</AddressLabel>
        <Label end={2} fontWeight={400}>
          {balanceData.multiplier.toFixed(2)}x
        </Label>

        <Label end={2} fontWeight={400}>
          {formatBalanceAmount(balanceData.balance)}
        </Label>

        <Label end={2} fontWeight={400}>
          {formatDollarAmount(balanceData.value)}
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
  const sortedBalanceData = useMemo(() => {
    if (!props.balanceData) {
      return []
    }
    return props.balanceData.slice().sort((a: any, b: any) => {
      if (a && b) {
        return a[sortField as keyof Balance] > b[sortField as keyof Balance]
          ? (sortDirection ? -1 : 1) * 1
          : (sortDirection ? -1 : 1) * -1
      } else {
        return -1
      }
    })
  }, [sortDirection, sortField, props.balanceData])

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
        <ClickableText color={theme.text2} end={1} onClick={() => handleSort(SORT_FIELD.multiplier)}>
          Final Multiplier {arrow(SORT_FIELD.multiplier)}
        </ClickableText>
        <ClickableText color={theme.text2} end={1} onClick={() => handleSort(SORT_FIELD.balance)}>
          Balance {arrow(SORT_FIELD.balance)}
        </ClickableText>
        <ClickableText color={theme.text2} end={1} onClick={() => handleSort(SORT_FIELD.value)}>
          Value {arrow(SORT_FIELD.value)}
        </ClickableText>
      </ResponsiveGrid>
      <Break />
      {sortedBalanceData.length > 0 ? (
        sortedBalanceData.map((data: Balance, i: any) => {
          return (
            <React.Fragment key={i}>
              <DataRow index={i} balanceData={data} />
              <Break />
            </React.Fragment>
          )
        })
      ) : (
        <LoadingRows isLoaded={props.isLoaded} />
      )}
    </AutoColumn>
  )
}
export default BalanceTable
