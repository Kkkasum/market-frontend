'use client'

import { useEffect, useState } from 'react'

import TimeSortDropdown from '@/components/dropdown/TimeSortDropdown'
import MarketNumbersTable from '@/components/table/market/MarketNumbersTable'
import SearchIcon from '@/components/ui/icons/SearchIcon'
import Input from '@/components/ui/Input'
import Loader from '@/components/ui/Loader'
import { IMarketNumber } from '@/types/market.type'
import { TimeSort } from '@/types/user.type'
import { sortByTime } from '@/utils/sortByTime'
import useMarketNumbers from '../hooks/useMarketNumbers'

export default function Page() {
	const { data, isLoading } = useMarketNumbers()

	const [timeSort, setTimeSort] = useState<TimeSort>(TimeSort.RECENTLY)
	const [searchItem, setSearchItem] = useState<string>()
	const [searchNumbers, setSearchNumbers] = useState<IMarketNumber[]>()

	useEffect(() => {
		if (searchItem) {
			setSearchNumbers(
				data?.numbers.filter(number =>
					number.number.includes(searchItem.toLowerCase())
				)
			)
		}
	}, [searchItem])

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.currentTarget.value
				? setSearchItem(e.currentTarget.value)
				: setSearchNumbers(data?.numbers)
		}
	}

	return (
		<div className='flex flex-col gap-5'>
			<div className='flex items-center p-3 gap-3 bg-gray-blue rounded-xl'>
				<SearchIcon />

				<div className='flex items-center gap-3'>
					<span>+888</span>

					<Input
						placeholder='Enter a number...'
						onKeyDown={onKeyDown}
					/>
				</div>
			</div>

			<div className='flex items-center justify-between text-start text-sm px-2'>
				<span className='text-2xl font-bold'>Numbers</span>

				<TimeSortDropdown filter={timeSort} setFilter={setTimeSort} />
			</div>

			{isLoading ? (
				<Loader />
			) : (
				<div className='flex items-center justify-center border border-transparent rounded-xl overflow-hidden bg-gray-blue min-w-80 min-h-20'>
					{searchItem ? (
						searchNumbers?.length ? (
							<MarketNumbersTable
								numbers={sortByTime(searchNumbers, timeSort)}
							/>
						) : (
							<span className='text-sm font-light opacity-40'>
								Numbers not found
							</span>
						)
					) : data ? (
						<MarketNumbersTable
							numbers={sortByTime(data.numbers, timeSort)}
						/>
					) : (
						<span className='text-sm font-light opacity-40'>
							There's no numbers yet
						</span>
					)}
				</div>
			)}
		</div>
	)
}
