import React from 'react'
import { useWhales } from 'state/setts/hooks'
import { WhaleInfo } from 'state/setts/reducer'
import { formatBalanceAmount } from 'utils/numbers'
import VaultTable from 'components/VaultTable'

interface Props {
  vaultAddress: string
}

const Whales = (props: Props) => {
  const whaleInfo = useWhales(props.vaultAddress)
  const tableData = whaleInfo?.map((w: WhaleInfo, index: number) => {
    return {
      linkAddress: '/user/' + w.address,
      labels: [
        {
          label: index + 1,
          width: '5%',
        },
        {
          label: w.address,
          width: '70%',
        },
        {
          label: formatBalanceAmount(w.shareBalance),
          width: '30%',
        },
        {
          label: formatBalanceAmount(w.underlyingBalance),
          width: '30%',
        },
      ],
    }
  })
  const headers = {
    number: {
      label: '#',
      width: '5%',
    },
    address: {
      label: 'Address',
      width: '70%',
    },
    shareBalance: {
      label: 'Share Balance',
      width: '30%',
    },
    underlyingBalance: {
      label: 'Underlying Balance',
      width: '30%',
    },
  }
  return <VaultTable headers={Object.values(headers)} data={tableData} />
}
export default Whales
