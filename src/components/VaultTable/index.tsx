import React from 'react'
import styled from 'styled-components'
import { PageButtons, Arrow, Break } from 'components/shared'
import { TYPE } from 'theme'
import { LoadingRows } from 'components/BalanceTable'
import { Link } from 'react-router-dom'

const Row = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
  padding-top: 10px;
`

const Wrapper = styled.div``

const LinkWrapper = styled(Link)`
  text-decoration: none;
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`
const MyLink = (props: any) => {
  if (props.external) {
    return (
      <a style={{ textDecoration: 'none' }} target="_blank" rel="noreferrer" href={props.link}>
        {props.children}
      </a>
    )
  } else {
    return <LinkWrapper to={props.link}>{props.children}</LinkWrapper>
  }
}

interface TableRowProps {
  linkAddress: any
  external: boolean
  labels: Array<{ label: string; width: string; externalLink?: string }>
  index: number
}
const TableRow = (props: TableRowProps) => {
  return (
    <MyLink external={props.external} link={props.linkAddress}>
      <Row>
        {props.labels.map((l, index) => {
          return (
            <TYPE.label key={index} style={{ width: l.width, textAlign: 'center' }}>
              {l.label}
            </TYPE.label>
          )
        })}
      </Row>
      <Break />
    </MyLink>
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
      {props.data ? (
        props.data.map((d: any, index: number) => {
          return <TableRow key={index} index={index} {...d} />
        })
      ) : (
        <LoadingRows />
      )}
    </Wrapper>
  )
}
export default VaultTable
