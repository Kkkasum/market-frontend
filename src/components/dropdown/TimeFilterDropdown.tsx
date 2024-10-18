import { TimeSort } from '@/types/user.type'
import { FC } from 'react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/Dropdown'

interface Props {
	filter: TimeSort
	setFilter: React.Dispatch<React.SetStateAction<TimeSort>>
}

const TimeSortDropdown: FC<Props> = ({ filter, setFilter }) => {
	const filters = [TimeSort.RECENTLY, TimeSort.OLDEST]

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

export default TimeSortDropdown
