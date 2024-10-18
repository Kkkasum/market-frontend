import { FC } from 'react'

import TonIcon from '@/components/ui/icons/TonIcon'
import UsdtIcon from '@/components/ui/icons/UsdtIcon'
import Table from '@/components/ui/Table'
import { ISwapTx } from '@/types/history.type'
import { Asset } from '@/types/user.type'

interface Props {
	txs: ISwapTx[]
	showTxModal: (tx: ISwapTx) => void
}

const SwapTable: FC<Props> = ({ txs, showTxModal }) => {
	const fields = ['From', 'To', 'Volume']

	return (
		<Table fields={fields}>
			{txs.map(tx => (
				<tr
					key={tx.id}
					className='bg-dark hover:bg-gray-blue cursor-pointer border-b-[1px] border-black relative right-caret'
					onClick={() => showTxModal(tx)}
				>
					<th className='flex items-center gap-1 font-medium'>
						{tx.fromToken === Asset.TON ? (
							<TonIcon width={16} height={16} />
						) : (
							<UsdtIcon width={16} height={16} />
						)}
						{tx.fromToken}
					</th>

					<td>
						<span className='flex items-center gap-1 font-medium'>
							{tx.toToken === Asset.TON ? (
								<TonIcon width={16} height={16} />
							) : (
								<UsdtIcon width={16} height={16} />
							)}
							{tx.toToken}
						</span>
					</td>

					<td className='text-start'>${tx.volume.toFixed(2)}</td>
				</tr>
			))}
		</Table>
	)
}

export default SwapTable
