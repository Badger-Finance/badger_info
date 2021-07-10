import React from 'react'
import styled from 'styled-components'
import VaultInfo from 'components/VaultInfo'
import { DarkGreyCard } from 'components/Card'
import { TYPE } from 'theme'
import { AutoColumn } from 'components/Column'
import { AutoRow } from 'components/Row'
import { useSetts } from 'state/setts/hooks'
import { SettInfo } from 'state/setts/reducer'
const PageWrapper = styled.div`
  width: 80%;
`
const VaultInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Vaults = () => {
  const setts = useSetts()
  return (
    <PageWrapper>
      <VaultInfoWrapper>
        {setts &&
          setts
            .slice()
            .sort((a: SettInfo, b: SettInfo) => {
              return b.tvl - a.tvl
            })
            .map((v: SettInfo) => {
              return (
                <DarkGreyCard style={{ margin: '15px', width: '300px', minWidth: '180px' }} key={v.name}>
                  <VaultInfo
                    id={v.vaultToken}
                    name={v.name}
                    tvl={v.tvl}
                    minApr={v.minApr}
                    maxApr={v.maxApr}
                    maxMult={v.maxMultiplier}
                    minMult={v.minMultiplier}
                  />
                </DarkGreyCard>
              )
            })}
      </VaultInfoWrapper>
    </PageWrapper>
  )
}
export default Vaults
