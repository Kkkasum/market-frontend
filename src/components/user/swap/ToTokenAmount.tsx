import { FC } from 'react'

import useTokenRate from '@/app/main/user/swap/hooks/useTokenRate'
import Input from '@/components/ui/Input'
import Loader from '@/components/ui/Loader'

interface Props {
	fromToken: string
	fromAmount: number
	toToken: string
}

const ToTokenAmount: FC<Props> = ({ fromToken, fromAmount, toToken }) => {
	const { data, isLoading } = useTokenRate(fromToken, toToken, !!fromAmount)

	return !fromAmount ? (
		<Input disabled readOnly placeholder='0' />
	) : isLoading ? (
		<Loader />
	) : (
		<Input
			disabled
			readOnly
			value={data && (fromAmount * +data.rate).toFixed(2)}
		/>
	)
}

export default ToTokenAmount
