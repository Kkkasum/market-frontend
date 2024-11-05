import { ChevronDownIcon } from '@radix-ui/react-icons'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'

import { PaymentType } from '@/types/deposit.type'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/Dropdown'
import SpbIcon from '../ui/icons/SpbIcon'
import WalletIcon from '../ui/icons/WalletIcon'

interface Props {
	paymentType?: PaymentType
	setPaymentType: React.Dispatch<
		React.SetStateAction<PaymentType | undefined>
	>
}

const PaymentTypeDropdown: FC<Props> = ({ paymentType, setPaymentType }) => {
	const paymentTypes = [
		{
			svg: <WalletIcon width={24} height={24} color='#fff' />,
			value: PaymentType.CARD,
		},
		{
			svg: <SpbIcon />,
			value: PaymentType.SPB,
		},
	]

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='flex items-center justify-between p-3 bg-gray-blue rounded-xl w-full outline-none'>
				{paymentType ? (
					<span>{paymentType}</span>
				) : (
					<span className='opacity-60'>Payment type</span>
				)}

				<ChevronDownIcon />
			</DropdownMenuTrigger>

			<DropdownMenuContent
				className='w-[90vw] text-start text-white bg-gray-blue border-transparent rounded-xl'
				align='start'
			>
				{paymentTypes.map(item => (
					<DropdownMenuItem
						key={item.value}
						className={twMerge(
							'gap-2 h-11 px-3',
							item.value === paymentType && 'asset-checked'
						)}
						onClick={() => setPaymentType(item.value)}
					>
						{item.svg}
						{item.value}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default PaymentTypeDropdown
