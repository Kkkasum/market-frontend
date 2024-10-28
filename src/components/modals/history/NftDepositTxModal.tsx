import { FC, useEffect, useState } from 'react'

import Button from '@/components/ui/Button'
import CheckIcon from '@/components/ui/icons/CheckIcon'
import CopyIcon from '@/components/ui/icons/CopyIcon'
import Modal from '@/components/ui/Modal'
import { INftDepositTx } from '@/types/history.type'
import {
	formatAddress,
	formatDate,
	formatNumber,
	formatTxHash,
} from '@/utils/formatters'
import isNumber from '@/utils/isNumber'

interface Props {
	modalOpen: boolean
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
	tx: INftDepositTx
}

const NftDepositTxModal: FC<Props> = ({ modalOpen, setModalOpen, tx }) => {
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
					<span>NFT</span>
					<span>
						{isNumber(tx.nftName)
							? formatNumber(tx.nftName)
							: `@${tx.nftName}`}
					</span>
				</p>

				<p className='flex items-center justify-between font-medium'>
					<span>NFT Address</span>
					<a
						href={`https://tonscan.org/address/${tx.nftAddress}`}
						target='_blank'
						className='hover:text-blue cursor-pointer transition-colors duration-300'
					>
						{formatAddress(tx.nftAddress)}
					</a>
				</p>

				<p className='flex items-center justify-between font-medium'>
					<span>Deposited at</span>
					<span>{formatDate(new Date(tx.createdAt))}</span>
				</p>

				<p className='flex items-center justify-between font-medium'>
					<span>Tx</span>
					<a
						href={`https://tonscan.org/tx/${tx.txHash}`}
						target='_blank'
						className='hover:text-blue cursor-pointer transition-colors duration-300'
					>
						{formatTxHash(tx.txHash)}
					</a>
				</p>

				<Button
					className='flex items-center gap-1 w-full h-12'
					onClick={handleCopy}
					disabled={isCopied}
				>
					{isCopied ? (
						<>
							<CheckIcon />
							<span>Copied</span>
						</>
					) : (
						<>
							<CopyIcon />
							<span>Copy</span>
						</>
					)}
				</Button>
			</div>
		</Modal>
	)
}

export default NftDepositTxModal
