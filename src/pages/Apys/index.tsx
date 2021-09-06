import React, { useState } from 'react'
import { TYPE } from 'theme'
import Select from 'react-select'
import { BOOSTS } from 'constants/boosts'
import styled from 'styled-components'

const MainWrapper = styled.div`
  width: 50%;
  margin: 0 auto;
`

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 20,
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = 'opacity 300ms'
    return { ...provided, opacity, transition }
  },
}

function APYs() {
  const [boost, setBoost] = useState(1)
  return (
    <MainWrapper>
      <TYPE.largeHeader style={{ textAlign: 'center' }}>APYs</TYPE.largeHeader>
      <div style={{ margin: '0 auto', width: '35%' }}>
        <Select
          styles={customStyles}
          onChange={(v: any) => {
            setBoost(v)
          }}
          options={BOOSTS.map((b) => {
            return {
              value: b,
              label: b,
            }
          })}
        ></Select>
      </div>
    </MainWrapper>
  )
}
export default APYs
