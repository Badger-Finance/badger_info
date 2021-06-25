import React, { useState, useEffect, useMemo } from 'react'
import { AutoColumn } from 'components/Column'
import useTheme from 'hooks/useTheme'
import { PageWrapper, ThemedBackgroundGlobal } from 'pages/styled'

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
