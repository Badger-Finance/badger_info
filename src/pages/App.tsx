import React, { Suspense, useState, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import Header from '../components/Header'
import URLWarning from '../components/Header/URLWarning'
import Popups from '../components/Popups'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import Home from './Home'
import TopBar from 'components/Header/TopBar'
import { LocalLoader } from 'components/Loader'
import { ExternalLink, HideMedium, TYPE } from 'theme'
import { useSubgraphStatus } from 'state/application/hooks'
import { DarkGreyCard } from 'components/Card'
import CycleAnalytics from 'pages/Cycle/CycleAnalytics'
import BoostsInfo from 'pages/Boosts/BoostsInfo'
import User from 'pages/User/User'
import Asset from 'pages/Assets/AssetInfo'
import Vaults from 'pages/Vaults'
import Vault from 'pages/Vault'
import AccountInputPage from 'pages/AccountInput/AccountInputPage'
import Apys from 'pages/Apys'
import UnlockSchedules from './Schedules/UnlockSchedules'
import Harvests from 'pages/Harvests/Harvest'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
  min-height: 100vh;
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  width: 100%;
  position: fixed;
  justify-content: space-between;
  z-index: 2;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 40px;
  margin-top: 100px;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding-top: 2rem;
    margin-top: 100px;
  `};

  z-index: 1;

  > * {
    max-width: 1200px;
  }
`

const Marginer = styled.div`
  margin-top: 5rem;
`

export default function App() {
  // pretend load buffer
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setLoading(false), 1300)
  }, [])

  // subgraph health
  const [subgraphStatus] = useSubgraphStatus()

  return (
    <Suspense fallback={null}>
      <Route component={GoogleAnalyticsReporter} />
      <Route component={DarkModeQueryParamReader} />
      {loading ? (
        <LocalLoader fill={true} />
      ) : subgraphStatus.available === false ? (
        <AppWrapper>
          <BodyWrapper>
            <DarkGreyCard style={{ maxWidth: '340px' }}>
              <TYPE.label>
                The Graph network which provides data for this site is temporarily down. Check status{' '}
                <ExternalLink href="https://thegraph.com/explorer/subgraph/ianlapham/uniswap-v3-testing">
                  here.
                </ExternalLink>
              </TYPE.label>
            </DarkGreyCard>
          </BodyWrapper>
        </AppWrapper>
      ) : (
        <AppWrapper>
          <URLWarning />
          <HeaderWrapper>
            <HideMedium>
              <TopBar />
            </HideMedium>
            <Header />
          </HeaderWrapper>
          <BodyWrapper>
            <Popups />
            <Switch>
              <Route exact path="/">
                <Redirect to="/boosts" />
              </Route>
              <Route exact strict path="/cycles" component={Home} />
              <Route exact strict path="/harvests" component={Harvests} />

              <Route exact strict path="/cycle/:cycleNumber" component={CycleAnalytics} />
              <Route exact strict path="/boosts" component={BoostsInfo} />
              <Route exact strict path="/user" component={AccountInputPage} />
              <Route exact strict path="/user/:address" component={User}></Route>
              <Route exact strict path="/asset/:asset" component={Asset}></Route>
              <Route exact strict path="/vaults" component={Vaults}></Route>
              <Route exact strict path="/vaults/:vaultAddress" component={Vault} />
              <Route exact strict path="/schedules" component={UnlockSchedules} />
              <Route exact strict path="/aprs" component={Apys} />
            </Switch>
            <Marginer />
          </BodyWrapper>
        </AppWrapper>
      )}
    </Suspense>
  )
}
