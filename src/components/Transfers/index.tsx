import React from 'react'
import { useDeposits, useWithdrawals } from 'state/setts/hooks'
import { VaultTransfers } from 'state/setts/reducer'
import { formatBalanceAmount } from 'utils/numbers'
import VaultTable from 'components/VaultTable'

interface TransfersProps {
  transfers: any
}

const Transfers = (props: TransfersProps) => {
  const tableData = props.transfers?.map((w: VaultTransfers, index: number) => {
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
          label: formatBalanceAmount(w.amount),
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
      label: 'Address',
      width: '70%',
    },
    amount: {
      label: 'Amount',
      width: '30%',
    },
    blockNumber: {
      label: 'Block Number',
      width: '30%',
    },
  }
  return <VaultTable headers={Object.values(headers)} data={tableData} />
}

interface Props {
  vaultAddress: string
}
export const Deposits = (props: Props) => {
  const deposits = useDeposits(props.vaultAddress)
  return <Transfers transfers={deposits} />
}

export const Withdrawals = (props: Props) => {
  const withdrawals = useWithdrawals(props.vaultAddress)
  return <Transfers transfers={withdrawals} />
}
