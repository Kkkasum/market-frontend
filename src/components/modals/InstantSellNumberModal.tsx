import WebApp from '@twa-dev/sdk'
import { FC } from 'react'

import useInstantSellPrice from '@/app/main/market/hooks/useInstantSellPrice'
import useInstantSellNumber from '@/app/main/number/hooks/useInstantSellNumber'
import { formatNumber } from '@/utils/formatters'
import Button from '../ui/Button'
import TonIcon from '../ui/icons/TonIcon'
import Loader from '../ui/Loader'
import Modal from '../ui/Modal'

interface Props {
	modalOpen: boolean
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
	number: string
}

const InstantSellNumberModal: FC<Props> = ({
	modalOpen,
	setModalOpen,
	number,
}) => {
	let userId = 1
	if (typeof window !== 'undefined') {
		userId = WebApp.initDataUnsafe.user?.id || 1
	}

	const { data, isLoading } = useInstantSellPrice()
	const { instantSellNumber, isSellPending, isError } = useInstantSellNumber(
		userId,
		number
	)

	return (
		<Modal
			modalOpen={modalOpen}
			setModalOpen={setModalOpen}
			header='Instant Sell'
		>
			{isLoading ? (
				<Loader />
			) : data ? (
				<>
					<div className='flex flex-col gap-3 mb-5'>
						<p className='flex items-center justify-between font-medium'>
							<span>Number</span>
							<span>{formatNumber(number)}</span>
						</p>

						<p className='flex items-center justify-between font-medium'>
							<span>Price</span>
							<span className='flex items-center gap-1'>
								<TonIcon
									width={16}
									height={16}
									color='#4EB2FF'
								/>
								{data.price}
							</span>
						</p>
					</div>

					<Button
						className='w-full font-bold'
						disabled={isSellPending || isError}
						onClick={() =>
							instantSellNumber({
								userId: userId,
								number: number,
							})
						}
					>
						{isSellPending ? (
							<Loader size={24} />
						) : isError ? (
							<span>Service is unavailable. Try again later</span>
						) : (
							'Confirm'
						)}
					</Button>
				</>
			) : (
				<span>Service is unavailable. Try again later</span>
			)}
		</Modal>
	)
}

export default InstantSellNumberModal
