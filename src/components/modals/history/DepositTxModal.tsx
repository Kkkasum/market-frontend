import { FC } from 'react'

import TonIcon from '@/components/ui/icons/TonIcon'
import UsdtIcon from '@/components/ui/icons/UsdtIcon'
import Modal from '@/components/ui/Modal'
import { IDepositTx } from '@/types/history.type'
import { Asset } from '@/types/user.type'
import { formatDate } from '@/utils/formatters'

interface Props {
	modalOpen: boolean
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
	tx: IDepositTx
}

const DepositTxModal: FC<Props> = ({ modalOpen, setModalOpen, tx }) => {
	return (
		<Modal
			modalOpen={modalOpen}
			setModalOpen={setModalOpen}
			header='Deposit'
		>
			<div className='flex flex-col gap-3 mb-5'>
				<p className='flex items-center justify-between font-medium'>
					<span>Token</span>
					<span className='flex items-center gap-1'>
						{tx.token === Asset.TON ? (
							<TonIcon width={16} height={16} />
						) : (
							<UsdtIcon width={16} height={16} />
						)}
						<span>{tx.token}</span>
					</span>
				</p>

				<p className='flex items-center justify-between font-medium'>
					<span>Amount</span>
					<span>{tx.amount}</span>
				</p>

				<p className='flex items-center justify-between font-medium'>
					<span>Deposited at</span>
					<span>{formatDate(new Date(tx.createdAt))}</span>
				</p>

				<p className='flex items-center justify-between font-medium'>
					<span>Tx</span>
					<span>
						{/* <a className='' href={`https://tonviewer.com/transaction/${tx.hash}`}>{formatTx(tx.address)}</a> */}
					</span>
				</p>
			</div>
		</Modal>
	)
}

export default DepositTxModal
