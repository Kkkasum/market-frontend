import { FC, useState } from 'react'

import { MarketBuy, MarketSell } from '@/components/market/MarketActions'
import MarketOrderModal from '@/components/modals/history/MarketOrderModal'
import TonIcon from '@/components/ui/icons/TonIcon'
import Table from '@/components/ui/Table'
import { IMarketOrder } from '@/types/history.type'
import { MarketAction } from '@/types/market.type'
import { formatNumber } from '@/utils/formatters'
import isNumber from '@/utils/isNumber'

interface Props {
	orders: IMarketOrder[]
}

const MarketOrderTable: FC<Props> = ({ orders }) => {
	const [order, setOrder] = useState<IMarketOrder>()
	const [modalOpen, setModalOpen] = useState<boolean>(false)

	const fields = ['NFT', 'Action', 'Price']

	const onClick = (order: IMarketOrder) => {
		setOrder(order)
		setModalOpen(true)
	}

	return (
		<>
			<Table fields={fields}>
				{orders.map(order => (
					<tr
						key={order.id}
						className='bg-dark hover:bg-gray-blue transition-colors duration-150 cursor-pointer border-b-[1px] border-black'
						onClick={() => onClick(order)}
					>
						<th className='flex items-center gap-1 font-medium'>
							{isNumber(order.nftName)
								? formatNumber(order.nftName)
								: `@${order.nftName}`}
						</th>

						<td>
							{order.action === MarketAction.BUY ? (
								<MarketBuy />
							) : (
								<MarketSell />
							)}
						</td>

						<td className='relative'>
							<span className='flex items-center gap-1 right-caret'>
								<TonIcon
									width={16}
									height={16}
									color='#4EB2FF'
								/>
								{order.price}
							</span>
						</td>
					</tr>
				))}
			</Table>

			{order && (
				<MarketOrderModal
					modalOpen={modalOpen}
					setModalOpen={setModalOpen}
					order={order}
				/>
			)}
		</>
	)
}

export default MarketOrderTable
