import { FC } from 'react'

import { Asset } from '@/types/user.type'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import TonIcon from '../ui/icons/TonIcon'

interface Props {
	modalOpen: boolean
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
	asset: Asset
	assetValue: string
	price: number
	buyAsset: () => void
	isBuyPending: boolean
}

const ConfirmModal: FC<Props> = ({
	modalOpen,
	setModalOpen,
	asset,
	assetValue,
	price,
	buyAsset,
	isBuyPending,
}) => {
	return (
		<Modal
			modalOpen={modalOpen}
			setModalOpen={setModalOpen}
			header='Confirm'
		>
			<div className='flex flex-col gap-3 mb-3'>
				<p className='flex items-center justify-between'>
					<span>{asset}</span>
					<span>{assetValue}</span>
				</p>

				<p className='flex items-center justify-between'>
					<span>Price</span>
					<span className='flex items-center gap-1'>
						<TonIcon width={16} height={16} color='#4EB2FF' />
						{price}
					</span>
				</p>
			</div>

			<Button
				className='w-full font-bold'
				disabled={false}
				onClick={buyAsset}
			>
				Confirm
			</Button>
		</Modal>
	)
}

export default ConfirmModal
