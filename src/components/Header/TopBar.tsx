import React from 'react'
import styled from 'styled-components'
import { RowBetween, RowFixed, AutoRow } from 'components/Row'
import { TYPE, ExternalLink } from 'theme'
import { useEthPrices } from 'hooks/useEthPrices'
import { formatDollarAmount } from 'utils/numbers'
import Polling from './Polling'

const Wrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.black};
  padding: 10px 20px;
`

const Item = styled(TYPE.main)`
  font-size: 12px;
`

const StyledLink = styled(ExternalLink)`
  font-size: 12px;
  color: ${({ theme }) => theme.text1};
`

const TopBar = () => {
  return (
    <Wrapper>
      <RowBetween>
        <AutoRow gap="6px">
          <RowFixed>
            <Item>BTC Price:</Item>
            <Item fontWeight="700" ml="4px">
              {'$30k'}
            </Item>
          </RowFixed>
        </AutoRow>
        <AutoRow gap="6px" style={{ justifyContent: 'flex-end' }}>
          <StyledLink href="https://badger.wiki">Docs</StyledLink>
          <StyledLink href="https://app.badger.finance">App</StyledLink>
        </AutoRow>
      </RowBetween>
    </Wrapper>
  )
}

export default TopBar
