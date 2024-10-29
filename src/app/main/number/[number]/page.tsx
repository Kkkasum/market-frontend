'use client'

import NumberMarket from '@/components/number/NumberMarket'
import NumberWallet from '@/components/number/NumberWallet'
import Loader from '@/components/ui/Loader'
import { NumberStatus } from '@/types/number.type'
import { formatNumber } from '@/utils/formatters'
import useNumber from '../hooks/useNumber'

export default function Page({ params }: { params: { number: string } }) {
	const { number } = params

	const { data, isLoading } = useNumber(number)

	return isLoading ? (
		<Loader className='fixed bottom-0 left-0 w-full h-full' />
	) : data ? (
		data.status === NumberStatus.WALLET ? (
			<NumberWallet {...data} />
		) : (
			<NumberMarket {...data} />
		)
	) : (
		<span className='flex items-center justify-center fixed bottom-0 left-0 w-full h-full'>
			Number {formatNumber(number)} not found
		</span>
	)
}
