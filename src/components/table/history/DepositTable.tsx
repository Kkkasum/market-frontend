import { FC } from 'react'

import TonIcon from '@/components/ui/icons/TonIcon'
import UsdtIcon from '@/components/ui/icons/UsdtIcon'
import Table from '@/components/ui/Table'
import { IDepositTx } from '@/types/history.type'
import { Asset, TxFilter } from '@/types/user.type'

interface Props {
	txs: IDepositTx[]
	showTxModal: (tx: IDepositTx, type: TxFilter) => void
}

const DepositTable: FC<Props> = ({ txs, showTxModal }) => {
	const fields = ['Token', 'Amount']

	return (
		<Table fields={fields}>
			{txs.map(tx => (
				<tr
					key={tx.id}
					className='bg-dark hover:bg-gray-blue cursor-pointer border-b-[1px] border-black relative right-caret'
					onClick={() => showTxModal(tx, TxFilter.DEPOSIT)}
				>
					<th className='flex items-center gap-1 font-medium'>
						{tx.token === Asset.TON ? (
							<TonIcon width={16} height={16} />
						) : (
							<UsdtIcon width={16} height={16} />
						)}
						{tx.token}
					</th>

					<td>{tx.amount}</td>
				</tr>
			))}
		</Table>
	)
}

export default DepositTable
