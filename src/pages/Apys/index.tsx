import React, { useState } from 'react'
import { TYPE } from 'theme'
import { DarkGreyCard } from 'components/Card'
import Select from 'react-select'
import { BOOSTS } from 'constants/boosts'
import styled from 'styled-components'
import { useSetts } from 'state/setts/hooks'
import { AutoColumn } from 'components/Column'
import { Link } from 'react-router-dom'

const MainWrapper = styled.div`
  margin: 0 auto;
  width: 70%;
`
const BoostSelectorWrapper = styled.div`
  margin: 0 auto;
  width: 100px;
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
`
const BoostLabelWrapper = styled.div`
  padding-bottom: 10px;
`
const VaultsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: center;
`
const LinkWrapper = styled(Link)`
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
  text-decoration-color: white;
  padding-left: 1rem;
  height: 5rem;
  overflow-wrap: break-word;
  min-width: 180px;
`
const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 10,
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = 'opacity 300ms'
    return { ...provided, opacity, transition }
  },
}

function APYs() {
  const [boost, setBoost] = useState({ label: 0, value: 0 })
  const setts = useSetts()
  return (
    <MainWrapper>
      <TYPE.largeHeader style={{ textAlign: 'center' }}>APRs</TYPE.largeHeader>
      <BoostSelectorWrapper>
        <BoostLabelWrapper>Boost</BoostLabelWrapper>
        <Select
          styles={customStyles}
          onChange={(v: any) => {
            console.log(v)
            setBoost(v)
          }}
          defaultValue={{ value: 0, label: 0 }}
          options={BOOSTS.map((b) => {
            return {
              value: b,
              label: b,
            }
          })}
        ></Select>
      </BoostSelectorWrapper>
      <VaultsWrapper>
        {setts &&
          setts
            .slice()
            .filter((sett) => {
              return sett.minApr !== sett.maxApr
            })
            .sort((a: any, b: any) => {
              return b.tvl - a.tvl
            })
            .map((v: any) => {
              const badgerRewards = v.sources.find((s: any) => {
                return s.boostable
              })
              const diff = badgerRewards.maxApr - badgerRewards.minApr
              const boostedApy = badgerRewards.minApr + (boost.value / 2000) * diff
              let newApy = 0
              v.sources.forEach((source: any) => {
                if (source.boostable) {
                  newApy += boostedApy
                } else {
                  newApy += source.minApr
                }
              })

              return (
                <DarkGreyCard key={v.name} style={{ width: '300px', minWidth: '180px', margin: '10px' }}>
                  <AutoColumn gap="10px">
                    <LinkWrapper to={`/vaults/${v.id}`}>
                      <TYPE.largeHeader>{v.name}</TYPE.largeHeader>
                    </LinkWrapper>
                    <AutoColumn gap="lg">
                      <AutoColumn style={{ paddingLeft: '10px' }} gap="4px">
                        <TYPE.main>Apr Range</TYPE.main>
                        <TYPE.label>
                          {v.minApr.toFixed(2)}% - {v.maxApr.toFixed(2)}%
                        </TYPE.label>
                      </AutoColumn>
                      <AutoColumn style={{ paddingLeft: '10px' }} gap="4px">
                        <TYPE.main>Boosted Apr</TYPE.main>
                        <TYPE.label>{newApy.toFixed(2)}%</TYPE.label>
                      </AutoColumn>
                    </AutoColumn>
                  </AutoColumn>
                </DarkGreyCard>
              )
            })}
      </VaultsWrapper>
    </MainWrapper>
  )
}
export default APYs
