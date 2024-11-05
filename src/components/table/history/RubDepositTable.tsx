import { FC, useState } from 'react'

import RubDepositTxModal from '@/components/modals/history/RubDepositTxModal'
import Table from '@/components/ui/Table'
import { IRubDepositTx } from '@/types/history.type'

interface Props {
	txs: IRubDepositTx[]
}

const RubDepositTable: FC<Props> = ({ txs }) => {
	const [tx, setTx] = useState<IRubDepositTx>()
	const [modalOpen, setModalOpen] = useState<boolean>(false)

	const fields = ['Payment Type', 'Amount (RUB)']

	const onClick = (tx: IRubDepositTx) => {
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
							{tx.paymentType}
						</th>

						<td className='relative'>
							<span className='right-caret'>{tx.amountRub}</span>
						</td>
					</tr>
				))}
			</Table>

			{tx && (
				<RubDepositTxModal
					modalOpen={modalOpen}
					setModalOpen={setModalOpen}
					tx={tx}
				/>
			)}
		</>
	)
}

export default RubDepositTable
