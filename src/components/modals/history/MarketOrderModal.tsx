import { FC } from 'react'

import { MarketBuy, MarketSell } from '@/components/market/MarketActions'
import TonIcon from '@/components/ui/icons/TonIcon'
import Modal from '@/components/ui/Modal'
import { IMarketOrder } from '@/types/history.type'
import { MarketAction } from '@/types/market.type'
import { formatAddress, formatDate, formatNumber } from '@/utils/formatters'
import isNumber from '@/utils/isNumber'

interface Props {
	modalOpen: boolean
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
	order: IMarketOrder
}

const MarketOrderModal: FC<Props> = ({ modalOpen, setModalOpen, order }) => {
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
						{isNumber(order.nftName)
							? formatNumber(order.nftName)
							: `@${order.nftName}`}
					</span>
				</p>

				<p className='flex items-center justify-between font-medium'>
					<span>NFT Address</span>
					<a
						href={`https://tonscan.org/address/${order.nftAddress}`}
						target='_blank'
						className='hover:text-blue cursor-pointer transition-colors duration-300'
					>
						{formatAddress(order.nftAddress)}
					</a>
				</p>

				<p className='flex items-center justify-between font-medium'>
					<span>Action</span>

					{order.action === MarketAction.BUY ? (
						<MarketBuy />
					) : (
						<MarketSell />
					)}
				</p>

				<p className='flex items-center justify-between font-medium'>
					<span>Price</span>
					<span className='flex items-center gap-1'>
						<TonIcon width={16} height={16} color='#4EB2FF' />
						{order.price}
					</span>
				</p>

				<p className='flex items-center justify-between font-medium'>
					<span>Created at</span>
					<span>{formatDate(new Date(order.createdAt))}</span>
				</p>
			</div>
		</Modal>
	)
}

export default MarketOrderModal
