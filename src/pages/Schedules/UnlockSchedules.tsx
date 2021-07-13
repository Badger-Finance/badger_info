import { AutoColumn } from 'components/Column'
import styled from 'styled-components'
import React from 'react'
import { TYPE } from 'theme'

const PageWrapper = styled.div`
  margin: 0 auto;
`

const UnlockSchedules = () => {
  return (
    <PageWrapper>
      <AutoColumn>
        <TYPE.largeHeader>Unlock Schedules</TYPE.largeHeader>
      </AutoColumn>
    </PageWrapper>
  )
}

export default UnlockSchedules
