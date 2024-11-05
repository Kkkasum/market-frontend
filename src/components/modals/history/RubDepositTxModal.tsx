import { FC } from 'react'

import Modal from '@/components/ui/Modal'
import { IRubDepositTx } from '@/types/history.type'
import { formatDate } from '@/utils/formatters'

interface Props {
	modalOpen: boolean
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
	tx: IRubDepositTx
}

const RubDepositTxModal: FC<Props> = ({ modalOpen, setModalOpen, tx }) => {
	return (
		<Modal
			modalOpen={modalOpen}
			setModalOpen={setModalOpen}
			header='Deposit'
		>
			<div className='flex flex-col gap-3 mb-5'>
				<p className='flex items-center justify-between font-medium'>
					<span>Payment Type</span>
					<span className='flex items-center gap-1'>
						<span>{tx.paymentType}</span>
					</span>
				</p>

				<p className='flex items-center justify-between font-medium'>
					<span>Amount (RUB)</span>
					<span>{tx.amountRub}</span>
				</p>

				<p className='flex items-center justify-between font-medium'>
					<span>Amount (USDT)</span>
					<span>{tx.amountUsdt}</span>
				</p>

				<p className='flex items-center justify-between font-medium'>
					<span>Deposited at</span>
					<span>{formatDate(new Date(tx.createdAt))}</span>
				</p>
			</div>
		</Modal>
	)
}

export default RubDepositTxModal
