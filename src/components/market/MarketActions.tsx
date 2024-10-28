import { FC } from 'react'

export const MarketBuy: FC = () => {
	return (
		<span className='bg-blue/10 opacity-90 px-2 py-1 rounded-lg text-xs font-bold text-blue'>
			BUY
		</span>
	)
}

export const MarketSell: FC = () => {
	return (
		<span className='bg-green/10 opacity-90 px-2 py-1 rounded-lg text-xs font-bold text-green'>
			SELL
		</span>
	)
}
