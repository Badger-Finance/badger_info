import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { AutoColumn } from 'components/Column'
import { AutoRow } from 'components/Row'
import { TYPE } from 'theme'
import { ResponsiveRow, RowBetween, RowFixed } from 'components/Row'
import LineChart from 'components/LineChart/alt'
import useTheme from 'hooks/useTheme'
import { useProtocolData, useProtocolChartData, useProtocolTransactions } from 'state/protocol/hooks'
import { DarkGreyCard } from 'components/Card'
import { formatDollarAmount } from 'utils/numbers'
import Percent from 'components/Percent'
import { HideMedium, HideSmall, StyledInternalLink } from '../../theme/components'
import TokenTable from 'components/tokens/TokenTable'
import PoolTable from 'components/pools/PoolTable'
import { PageWrapper, ThemedBackgroundGlobal } from 'pages/styled'
import { unixToDate } from 'utils/date'
import BarChart from 'components/BarChart/alt'
import { useAllPoolData } from 'state/pools/hooks'
import { notEmpty } from 'utils'
import TransactionsTable from '../../components/TransactionsTable'
import { useAllTokenData } from 'state/tokens/hooks'
import { MonoSpace } from 'components/shared'
import dayjs from 'dayjs'

import Cycle from 'pages/Cycle/CycleInfo'

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const theme = useTheme()
  const cycleData = {
    root: '0xd71572326a87ea382b8e5153cc3deabf7accb9a4433e669d8ec7a63e2e05aff2',
    contentHash: '0x717afaeeb884026d5149e4428ca27f09666767c26f59a64287846658adb6754e',
    cycleNumber: 2176,
    startBlock: 12697179,
    endBlock: 12697653,
  }
  const cycleArray = Array.from(Array(10).keys()).map((el) => {
    const newElement = { ...cycleData }
    newElement.cycleNumber = cycleData.cycleNumber - el
    return newElement
  })
  console.log(cycleArray)
  return (
    <PageWrapper>
      <ThemedBackgroundGlobal backgroundColor={'#808080'} />
      <AutoColumn gap="20px">
        {cycleArray.map((element) => {
          return <Cycle key={element.cycleNumber} {...element} />
        })}
      </AutoColumn>
    </PageWrapper>
  )
}
