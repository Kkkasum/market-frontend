import { FC } from 'react'

export const StatusWallet: FC = () => {
	return (
		<span className='bg-blue/10 opacity-90 px-2 py-1 rounded-lg text-xs text-blue'>
			Wallet
		</span>
	)
}

export const StatusMarket: FC = () => {
	return (
		<span className='bg-green/10 opacity-90 px-2 py-1 rounded-lg text-xs text-green'>
			Market
		</span>
	)
}
