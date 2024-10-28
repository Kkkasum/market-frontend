import { FC, useState } from 'react'

import SwapTxModal from '@/components/modals/history/SwapTxModal'
import TonIcon from '@/components/ui/icons/TonIcon'
import UsdtIcon from '@/components/ui/icons/UsdtIcon'
import Table from '@/components/ui/Table'
import { ISwapTx } from '@/types/history.type'
import { Asset } from '@/types/user.type'

interface Props {
	txs: ISwapTx[]
}

const SwapTable: FC<Props> = ({ txs }) => {
	const [tx, setTx] = useState<ISwapTx>()
	const [modalOpen, setModalOpen] = useState<boolean>(false)

	const fields = ['From', 'To', 'Volume']

	const onClick = (tx: ISwapTx) => {
		setTx(tx)
		setModalOpen(true)
	}

	return (
		<>
			<Table fields={fields}>
				{txs.map(tx => (
					<tr
						key={tx.id}
						className='bg-dark hover:bg-gray-blue transition-colors duration-150 cursor-pointer border-b-[1px] border-black'
						onClick={() => onClick(tx)}
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

						<td className='text-start relative'>
							<span className='right-caret'>
								${tx.volume.toFixed(2)}
							</span>
						</td>
					</tr>
				))}
			</Table>

			{tx && (
				<SwapTxModal
					modalOpen={modalOpen}
					setModalOpen={setModalOpen}
					tx={tx}
				/>
			)}
		</>
	)
}

export default SwapTable
