import Image from 'next/image'
import { FC } from 'react'

import TonIcon from '@/components/ui/icons/TonIcon'
import UsdtIcon from '@/components/ui/icons/UsdtIcon'
import Modal from '@/components/ui/Modal'
import { ISwapTx } from '@/types/history.type'
import { Asset } from '@/types/user.type'
import { formatDate } from '@/utils/formatters'

interface Props {
	modalOpen: boolean
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
	tx: ISwapTx
}

const SwapTxModal: FC<Props> = ({ modalOpen, setModalOpen, tx }) => {
	return (
		<Modal modalOpen={modalOpen} setModalOpen={setModalOpen} header='Swap'>
			<div className='flex flex-col gap-3 mb-5'>
				<div className='flex items-center justify-center gap-10 text-base font-medium'>
					<p className='flex flex-col items-center justify-between font-medium'>
						{tx.fromToken === Asset.TON ? (
							<TonIcon width={24} height={24} />
						) : (
							<UsdtIcon width={24} height={24} />
						)}
						<span>{`${tx.fromAmount} ${tx.fromToken}`}</span>
					</p>

					<Image
						src='/right-caret.svg'
						alt=''
						width={20}
						height={20}
					/>

					<p className='flex flex-col items-center justify-between font-medium'>
						{tx.toToken === Asset.TON ? (
							<TonIcon width={24} height={24} />
						) : (
							<UsdtIcon width={24} height={24} />
						)}
						<span>
							{tx.toAmount?.toFixed(5)} {tx.toToken}
						</span>
					</p>
				</div>

				<p className='flex items-center justify-between font-medium'>
					<span>Volume</span>
					<span>{tx.volume.toFixed(2)}</span>
				</p>

				<p className='flex items-center justify-between font-medium'>
					<span>Swapped at</span>
					<span>{formatDate(new Date(tx.createdAt))}</span>
				</p>
			</div>
		</Modal>
	)
}

export default SwapTxModal
