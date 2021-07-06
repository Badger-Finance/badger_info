import React from 'react'
import { useWhales } from 'state/setts/hooks'
import styled from 'styled-components'
import { WhaleInfo } from 'state/setts/reducer'
import { PageButtons, Arrow, Break } from 'components/shared'
import { TYPE } from 'theme'
import { formatBalanceAmount } from 'utils/numbers'
import { Link } from 'react-router-dom'
import { Label, ClickableText } from 'components/Text'

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
interface TableRowProps {
  linkAddress?: string
  labels: Array<{ label: string; width: string; externalLink?: string }>
  index: number
}
const TableRow = (props: TableRowProps) => {
  return (
    <LinkWrapper to={props.linkAddress || ''}>
      <Row>
        {props.labels.map((l, index) => {
          if (l.externalLink) {
            return <div></div>
          } else {
            return (
              <TYPE.label key={index} style={{ width: l.width, textAlign: 'center' }}>
                {l.label}
              </TYPE.label>
            )
          }
        })}
      </Row>
      <Break />
    </LinkWrapper>
  )
}

interface VaultTableProps {
  headers: Array<{ label: string; width: string }>
  data: any
}
const VaultTable = (props: VaultTableProps) => {
  return (
    <Wrapper>
      <Row>
        {props.headers.map((h) => {
          return (
            <TYPE.label key={h.label} style={{ width: h.width, color: 'grey', textAlign: 'center' }}>
              {h.label}
            </TYPE.label>
          )
        })}
      </Row>
      <Break />
      {props.data &&
        props.data.map((d: any, index: number) => {
          return <TableRow key={index} index={index} {...d} />
        })}
    </Wrapper>
  )
}
export default VaultTable
