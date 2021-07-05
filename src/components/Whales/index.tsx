import React from 'react'
import { useWhaleData } from 'state/setts/hooks'
import styled from 'styled-components'
import { WhaleInfo } from 'state/setts/reducer'
import { PageButtons, Arrow, Break } from 'components/shared'
import { TYPE } from 'theme'
import { formatBalanceAmount } from 'utils/numbers'
import { Link } from 'react-router-dom'
import { Label, ClickableText } from 'components/Text'

interface Props {
  vaultAddress: string
}
const Row = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
  padding-top: 10px;
`

const Wrapper = styled.div``

const AddressLabel = styled(Label)`
  display: inline-block;
  text-decoration: underline;
`
const LinkWrapper = styled(Link)`
  text-decoration: none;
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`
const WhaleRow = (props: any) => {
  console.log(props)
  return (
    <LinkWrapper to={`/user/${props.address}`}>
      <Row>
        <TYPE.label style={{ width: '10%' }}>{props.number + 1}</TYPE.label>
        <AddressLabel style={{ width: '70%' }}>{props.address}</AddressLabel>
        <TYPE.label style={{ width: '30%', textAlign: 'center' }}>
          {formatBalanceAmount(Number(props.shareBalance))}
        </TYPE.label>
        <TYPE.label style={{ width: '30%', textAlign: 'center' }}>
          {formatBalanceAmount(props.underlyingBalance)}
        </TYPE.label>
      </Row>
      <Break />
    </LinkWrapper>
  )
}
const Whales = (props: Props) => {
  const whaleInfo = useWhaleData(props.vaultAddress)
  console.log(whaleInfo)
  return (
    <Wrapper>
      <>
        <Row>
          <TYPE.label style={{ width: '10%', color: 'grey' }}>#</TYPE.label>
          <TYPE.label style={{ width: '70%', color: 'grey' }}>Address</TYPE.label>
          <TYPE.label style={{ width: '30%', textAlign: 'center', color: 'grey' }}>Share Balance</TYPE.label>
          <TYPE.label style={{ width: '30%', textAlign: 'center', color: 'grey' }}>Underlying Balance</TYPE.label>
        </Row>
        <Break />
      </>
      {whaleInfo &&
        whaleInfo.map((w, i) => {
          return (
            <WhaleRow
              number={i}
              key={w.address}
              address={w.address}
              shareBalance={w.shareBalance}
              underlyingBalance={w.underlyingBalance}
            />
          )
        })}
    </Wrapper>
  )
}
export default Whales
