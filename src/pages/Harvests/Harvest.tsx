import React, { useEffect, useState } from 'react'
import { TYPE } from 'theme'
import { DarkGreyCard } from 'components/Card'
import Select from 'react-select'
import { BOOSTS } from 'constants/boosts'
import styled from 'styled-components'
import { useHarvests, useSetts } from 'state/setts/hooks'
import { AutoColumn } from 'components/Column'
import { Link } from 'react-router-dom'
import { HarvestData } from 'pages/Cycle/CycleAnalytics'
import { fetchHarvests } from 'data/cycles'
import { useHarvestData } from 'state/cycle/hooks'
const MainWrapper = styled.div`
  margin: 0 auto;
  width: 70%;
`

const Harvests = () => {
  const allHarvests = useHarvestData()
  return (
    <MainWrapper>
      <TYPE.largeHeader style={{ textAlign: 'center', paddingBottom: '10px' }}>Harvests</TYPE.largeHeader>
      <HarvestData harvests={allHarvests}></HarvestData>
    </MainWrapper>
  )
}
export default Harvests
