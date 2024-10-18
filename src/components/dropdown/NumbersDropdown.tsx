import { ChevronDownIcon } from '@radix-ui/react-icons'
import { FC } from 'react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/Dropdown'
import { INumber } from '@/types/number.type'
import { formatNumber } from '@/utils/formatters'

interface Props {
	numbers?: INumber[]
	number?: string
	setNumber: React.Dispatch<React.SetStateAction<string | undefined>>
}

const NumbersDropdown: FC<Props> = ({ numbers, number, setNumber }) => {
	return (
		<div className='flex flex-col items-start gap-1 w-full'>
			<span className='text-lg font-bold'>Select number</span>

			<DropdownMenu>
				<DropdownMenuTrigger className='flex items-center justify-between p-3 bg-gray-blue rounded-xl w-full outline-none'>
					{number ? (
						<span>{formatNumber(number)}</span>
					) : (
						<span className='opacity-60'>Number</span>
					)}

					<ChevronDownIcon />
				</DropdownMenuTrigger>

				<DropdownMenuContent className='w-[90vw] text-start text-white bg-gray-blue border-transparent rounded-xl'>
					{numbers ? (
						numbers.map(number => (
							<DropdownMenuItem
								key={number.id}
								onClick={() => setNumber(number.number)}
							>
								{formatNumber(number.number)}
							</DropdownMenuItem>
						))
					) : (
						<span>You have no usernames yet</span>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}

export default NumbersDropdown
