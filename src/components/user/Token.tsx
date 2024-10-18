import { FC } from 'react'

interface Props {
	price: number
	priceUsd: number
	children: React.ReactNode
}

const Token: FC<Props> = ({ price, priceUsd, children }) => {
	return (
		<div className='flex items-center justify-between py-2 px-3 border border-solid border-white/10 rounded-lg'>
			<p className='flex items-center gap-2'>{children}</p>

			<p className='flex flex-col items-end justify-center'>
				<span>{price.toFixed(2)}</span>
				<span className='opacity-40'>${priceUsd.toFixed(2)}</span>
			</p>
		</div>
	)
}

export default Token
