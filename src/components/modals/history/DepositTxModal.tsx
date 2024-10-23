import { FC, useEffect, useState } from 'react'

import Button from '@/components/ui/Button'
import CheckIcon from '@/components/ui/icons/CheckIcon'
import CopyIcon from '@/components/ui/icons/CopyIcon'
import TonIcon from '@/components/ui/icons/TonIcon'
import UsdtIcon from '@/components/ui/icons/UsdtIcon'
import Modal from '@/components/ui/Modal'
import { IDepositTx } from '@/types/history.type'
import { Asset } from '@/types/user.type'
import { formatDate, formatTxHash } from '@/utils/formatters'

interface Props {
	modalOpen: boolean
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
	tx: IDepositTx
}

const DepositTxModal: FC<Props> = ({ modalOpen, setModalOpen, tx }) => {
	const [isCopied, setIsCopied] = useState<boolean>(false)

	const handleCopy = () => {
		navigator.clipboard.writeText(tx.txHash)
		setIsCopied(true)
	}

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsCopied(false)
		}, 1500)

		return () => clearTimeout(timeout)
	}, [isCopied])

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
					<span>Tx hash</span>
					<a
						// href={
						// 	tx.token === 'TON'
						// 		? `https://testnet.tonscan.com/tx/${tx.txHash}`
						// 		: `https://tronscan.org/#/transaction/${tx.txHash}`
						// }
						// target='_blank'
						className='hover:text-blue cursor-pointer transition-colors duration-300'
					>
						{formatTxHash(tx.txHash)}
					</a>
				</p>

				{isCopied ? (
					<Button
						className='flex items-center gap-1 w-full h-12'
						disabled
					>
						<CheckIcon />
						<span>Copied</span>
					</Button>
				) : (
					<Button
						className='flex items-center gap-1 w-full h-12'
						onClick={handleCopy}
					>
						<CopyIcon />
						<span>Copy</span>
					</Button>
				)}
			</div>
		</Modal>
	)
}

export default DepositTxModal
