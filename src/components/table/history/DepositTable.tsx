import { FC, useState } from 'react'

import DepositTxModal from '@/components/modals/history/DepositTxModal'
import TonIcon from '@/components/ui/icons/TonIcon'
import UsdtIcon from '@/components/ui/icons/UsdtIcon'
import Table from '@/components/ui/Table'
import { IDepositTx } from '@/types/history.type'
import { Asset } from '@/types/user.type'

interface Props {
	txs: IDepositTx[]
}

const DepositTable: FC<Props> = ({ txs }) => {
	const [tx, setTx] = useState<IDepositTx>()
	const [modalOpen, setModalOpen] = useState<boolean>(false)

	const fields = ['Token', 'Amount']

	const onClick = (tx: IDepositTx) => {
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
							{tx.token === Asset.TON ? (
								<TonIcon width={16} height={16} />
							) : (
								<UsdtIcon width={16} height={16} />
							)}
							{tx.token}
						</th>

						<td className='relative'>
							<span className='right-caret'>{tx.amount}</span>
						</td>
					</tr>
				))}
			</Table>

			{tx && (
				<DepositTxModal
					modalOpen={modalOpen}
					setModalOpen={setModalOpen}
					tx={tx}
				/>
			)}
		</>
	)
}

export default DepositTable
