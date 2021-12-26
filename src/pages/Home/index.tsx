import React, { useState, useEffect, useMemo } from 'react'
import { AutoColumn } from 'components/Column'
import { PageButtons, Arrow, Break } from 'components/shared'
import { TYPE } from 'theme'
import { PageWrapper, ThemedBackgroundGlobal } from 'pages/styled'

import Cycle from 'components/Cycle'
import { useCyclePageData } from 'state/cycle/hooks'
export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [page, setPage] = useState<number>(0)
  const cyclePageData = useCyclePageData(page) || []
  const maxPage = 15

  return (
    <PageWrapper>
      <ThemedBackgroundGlobal backgroundColor={'#808080'} />
      <AutoColumn gap="20px">
        {cyclePageData.map((element) => {
          return <Cycle key={element.cycle} {...element} />
        })}
        <PageButtons>
          <div
            onClick={() => {
              setPage(page === 0 ? page : page - 1)
            }}
          >
            <Arrow faded={page === 0 ? true : false}>←</Arrow>
          </div>
          <TYPE.body>{'Page ' + (page + 1) + ' of ' + maxPage}</TYPE.body>
          <div
            onClick={() => {
              setPage(page === maxPage - 1 ? page : page + 1)
            }}
          >
            <Arrow faded={page === maxPage - 1 ? true : false}>→</Arrow>
          </div>
        </PageButtons>
      </AutoColumn>
    </PageWrapper>
  )
}
