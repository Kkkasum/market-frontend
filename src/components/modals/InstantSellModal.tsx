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
}

const InstantSellModal: FC<Props> = ({
	modalOpen,
	setModalOpen,
	asset,
	assetValue,
}) => {
	const confirmSell = () => {}

	return (
		<Modal
			modalOpen={modalOpen}
			setModalOpen={setModalOpen}
			header='Instant sell'
		>
			<div className='flex flex-col gap-3 mb-5'>
				<p className='flex items-center justify-between font-medium'>
					<span>{asset}</span>
					<span>{assetValue}</span>
				</p>

				<p className='flex items-center justify-between font-medium'>
					<span>Price</span>
					<span className='flex items-center gap-1'>
						<TonIcon width={16} height={16} color='#4EB2FF' />
						{1}
					</span>
				</p>
			</div>

			<Button className='w-full' disabled={false} onClick={confirmSell}>
				Confirm
			</Button>
		</Modal>
	)
}

export default InstantSellModal
