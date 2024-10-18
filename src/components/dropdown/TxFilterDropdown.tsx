import { TxFilter } from '@/types/user.type'
import { FC } from 'react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/Dropdown'

interface Props {
	filter: TxFilter
	setFilter: React.Dispatch<React.SetStateAction<TxFilter>>
}

const TxFilterDropdown: FC<Props> = ({ filter, setFilter }) => {
	const filters = [TxFilter.DEPOSIT, TxFilter.WITHDRAWAL, TxFilter.SWAP]

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='flex items-center justify-between px-2 py-2 bg-gray-blue rounded-lg outline-none'>
				<span className='relative down-caret text-start pr-5'>
					{filter}
				</span>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				className='text-start text-white bg-gray-blue border-transparent rounded-xl'
				align='end'
			>
				{filters.map((f, index) => (
					<DropdownMenuItem
						key={index}
						className={f === filter ? 'checked' : ''}
						onClick={() => setFilter(f)}
					>
						{f}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default TxFilterDropdown
