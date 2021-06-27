import React, { useRef, useCallback, useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import Row, { RowFixed } from 'components/Row'
import { HideSmall, TYPE } from 'theme'
import Hotkeys from 'react-hot-keys'
import { useFetchSearchResults } from 'data/search'
import { AutoColumn } from 'components/Column'
import CurrencyLogo from 'components/CurrencyLogo'
import { formatDollarAmount } from 'utils/numbers'
import DoubleCurrencyLogo from 'components/DoubleLogo'
import { GreyBadge } from 'components/Card'
import { feeTierPercent } from 'utils'
import { useSavedTokens, useSavedPools } from 'state/user/hooks'
import { SavedIcon } from 'components/Button'
import { useHistory } from 'react-router-dom'
import { useTokenDatas } from 'state/tokens/hooks'
import { usePoolDatas } from 'state/pools/hooks'
import HoverInlineText from 'components/HoverInlineText'
import { TOKEN_HIDE, POOL_HIDE } from '../../constants/index'

const Container = styled.div`
  position: relative;
  z-index: 30;
  width: 100%;
`

const Wrapper = styled(Row)`
  background-color: ${({ theme }) => theme.black};
  padding: 10px 16px;
  width: 500px;
  height: 38px;
  border-radius: 20px;
  positon: relative;
  z-index: 9999;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 100%;
  `};
`

const StyledInput = styled.input`
  position: relative;
  display: flex;
  align-items: center;
  white-space: nowrap;
  background: none;
  border: none;
  width: 100%;
  font-size: 16px;
  outline: none;
  color: ${({ theme }) => theme.text1};

  ::placeholder {
    color: ${({ theme }) => theme.text3};
    font-size: 16px;
  }

  @media screen and (max-width: 640px) {
    ::placeholder {
      font-size: 1rem;
    }
  }
`

const Menu = styled.div<{ hide: boolean }>`
  display: flex;
  flex-direction: column;
  z-index: 9999;
  width: 800px;
  top: 50px;
  max-height: 600px;
  overflow: auto;
  right: 0;
  padding: 1.5rem;
  padding-bottom: 1.5rem;
  position: absolute;
  background: ${({ theme }) => theme.bg0};
  border-radius: 8px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.04);
  display: ${({ hide }) => hide && 'none'};
  border: 1px solid ${({ theme }) => theme.pink1};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    position: absolute;
    margin-top: 4px;
    z-index: 9999;
    width: 100%;
    max-height: 400px;
  `};
`

const Blackout = styled.div`
  position: absolute;
  min-height: 100vh;
  width: 100vw;
  z-index: -40;
  background-color: black;
  opacity: 0.7;
  left: 0;
  top: 0;
`

const ResponsiveGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  grid-template-columns: 1.5fr repeat(3, 1fr);
  align-items: center;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: 1fr;
  `};
`

const Break = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.bg1};
  width: 100%;
`

const HoverText = styled.div<{ hide?: boolean | undefined }>`
  color: ${({ theme }) => theme.blue1}
  display: ${({ hide = false }) => hide && 'none'};
  :hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const HoverRowLink = styled.div`
  :hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const OptionButton = styled.div<{ enabled: boolean }>`
  width: fit-content;
  padding: 4px 8px;
  border-radius: 8px;
  display: flex;
  font-size: 12px;
  font-weight: 600;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, enabled }) => (enabled ? theme.pink1 : 'transparent')};
  color: ${({ theme, enabled }) => (enabled ? theme.white : theme.pink1)};
  :hover {
    opacity: 0.6;
    cursor: pointer;
  }
`

const Search = ({ ...rest }: React.HTMLAttributes<HTMLDivElement>) => {
  const history = useHistory()

  const ref = useRef<HTMLInputElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const handleDown = useCallback(() => {
    if (ref != null && ref.current !== null) {
      ref.current.focus()
    }
  }, [])

  const [focused, setFocused] = useState<boolean>(false)
  const [showMenu, setShowMenu] = useState(false)
  const [value, setValue] = useState('')

  const handleClick = (e: any) => {
    if (!(menuRef.current && menuRef.current.contains(e.target)) && !(ref.current && ref.current.contains(e.target))) {
      setShowMenu(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  })

  return (
    <Hotkeys keyName="command+/" onKeyDown={handleDown}>
      {showMenu ? <Blackout /> : null}
      <Container>
        <Wrapper {...rest}>
          <StyledInput
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
            }}
            placeholder="Search Cycles and Users"
            ref={ref}
            onFocus={() => {
              setFocused(true)
              setShowMenu(true)
            }}
            onBlur={() => setFocused(false)}
          />
          {!focused && <TYPE.gray pl="2px">⌘/</TYPE.gray>}
        </Wrapper>
        <Menu hide={!showMenu} ref={menuRef}>
          <AutoColumn gap="lg">
            <AutoColumn gap="sm"></AutoColumn>
            <ResponsiveGrid>
              <TYPE.main>Cycle</TYPE.main>
              <HideSmall>
                <TYPE.main textAlign="end" fontSize="12px">
                  Cycle Number
                </TYPE.main>
              </HideSmall>
              <HideSmall>
                <TYPE.main textAlign="end" fontSize="12px">
                  Start Block
                </TYPE.main>
              </HideSmall>
              <HideSmall>
                <TYPE.main textAlign="end" fontSize="12px">
                  End Block
                </TYPE.main>
              </HideSmall>
            </ResponsiveGrid>
          </AutoColumn>
        </Menu>
      </Container>
    </Hotkeys>
  )
}

export default Search
