import React from 'react'
import { formatBalanceAmount, formatDollarAmount } from 'utils/numbers'
import VaultTable from 'components/VaultTable'
import { HarvestInfo } from 'state/setts/reducer'
import { useHarvests } from 'state/setts/hooks'
import { EXPLORER_TX_URL } from 'data/urls'
interface Props {
  vaultAddress: string
}

const Harvests = (props: Props) => {
  const harvests = useHarvests(props.vaultAddress)
  const tableData = harvests?.map((w: HarvestInfo, index: number) => {
    const txHash = w.transactionHash
    return {
      linkAddress: EXPLORER_TX_URL + w.transactionHash,
      external: true,
      labels: [
        {
          label: index + 1,
          width: '5%',
        },
        {
          label: txHash.substring(0, 10) + '...' + txHash.slice(txHash.length - 10),
          width: '70%',
        },
        {
          label: formatBalanceAmount(w.earnings),
          width: '30%',
        },
        {
          label: w.blockNumber,
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
      label: 'Tx Hash',
      width: '70%',
    },
    amount: {
      label: 'Amount',
      width: '30%',
    },
    value: {
      label: 'Block Number',
      width: '30%',
    },
  }
  return <VaultTable headers={Object.values(headers)} data={tableData} />
}

export default Harvests
