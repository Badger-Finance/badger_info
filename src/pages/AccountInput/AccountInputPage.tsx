import React, { useRef, useCallback, useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { AutoColumn } from 'components/Column'
import Row, { RowFixed } from 'components/Row'
import { HideSmall, TYPE } from 'theme'
import { useHistory } from 'react-router-dom'
import { isAddress } from 'utils'
import { getAddress } from 'ethers/lib/utils'

const SearchWrapper = styled.div`
  margin: 0 auto;
`
const Container = styled.div`
  position: relative;
  z-index: 30;
  width: 100%;
`

const Wrapper = styled(Row)`
  background-color: ${({ theme }) => theme.black};
  padding: 10px 16px;
  width: 500px;
  height: 38px;
  border-radius: 20px;
  positon: relative;
  z-index: 9999;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 100%;
  `};
`

const StyledInput = styled.input`
  position: relative;
  display: flex;
  align-items: center;
  white-space: nowrap;
  background: none;
  border: none;
  width: 100%;
  font-size: 16px;
  outline: none;
  color: ${({ theme }) => theme.text1};

  ::placeholder {
    color: ${({ theme }) => theme.text3};
    font-size: 16px;
  }

  @media screen and (max-width: 640px) {
    ::placeholder {
      font-size: 1rem;
    }
  }
`
const AccountInput = ({ ...rest }: React.HTMLAttributes<HTMLDivElement>) => {
  const history = useHistory()
  const [value, setValue] = useState('')

  return (
    <Container>
      <Wrapper {...rest}>
        <StyledInput
          type="text"
          value={value}
          onChange={async (e) => {
            setValue(e.target.value)
            const address = isAddress(e.target.value)
            if (address) {
              await new Promise((resolve) => setTimeout(resolve, 500)) // 3 sec
              history.push(`/user/${address}`)
            }
          }}
          placeholder="Enter Address"
        />
      </Wrapper>
    </Container>
  )
}
const AccountInputPage = () => {
  return (
    <React.Fragment>
      <AutoColumn style={{ width: '100%' }} gap="15px">
        <TYPE.largeHeader style={{ textAlign: 'center' }}>User Analytics</TYPE.largeHeader>
        <SearchWrapper>
          <AccountInput />
        </SearchWrapper>
      </AutoColumn>
    </React.Fragment>
  )
}

export default AccountInputPage
