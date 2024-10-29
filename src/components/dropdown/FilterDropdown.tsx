import { FC } from 'react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/Dropdown'

interface Props {
	currentFilter: string
	filters: string[]
	setFilter: React.Dispatch<React.SetStateAction<string>>
	align?: 'center' | 'end' | 'start'
}

const FilterDropdown: FC<Props> = ({
	currentFilter,
	filters,
	setFilter,
	align,
}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='flex items-center justify-between px-2 py-2 bg-gray-blue rounded-lg outline-none'>
				<span className='relative down-caret text-start pr-5 font-bold'>
					{currentFilter}
				</span>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				className='text-start text-white bg-gray-blue border-transparent rounded-xl'
				align={align}
			>
				{filters.map((f, index) => (
					<DropdownMenuItem
						key={index}
						className={f === currentFilter ? 'checked' : ''}
						onClick={() => setFilter(f)}
					>
						{f}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default FilterDropdown
