'use client'

import { useEffect, useState } from 'react'

import TimeSortDropdown from '@/components/dropdown/TimeFilterDropdown'
import MarketUsernamesTable from '@/components/table/market/MarketUsernamesTable'
import SearchIcon from '@/components/ui/icons/SearchIcon'
import Input from '@/components/ui/Input'
import Loader from '@/components/ui/Loader'
import { IMarketUsername } from '@/types/market.type'
import { TimeSort } from '@/types/user.type'
import { sortByTime } from '@/utils/sortByTime'
import useMarketUsernames from '../hooks/useMarketUsernames'

export default function Page() {
	const { data, isLoading } = useMarketUsernames()

	const [timeSort, setTimeSort] = useState<TimeSort>(TimeSort.RECENTLY)
	const [searchItem, setSearchItem] = useState<string>()
	const [searchUsernames, setSearchUsernames] = useState<IMarketUsername[]>()

	useEffect(() => {
		if (searchItem) {
			setSearchUsernames(
				data?.usernames.filter(username =>
					username.username.includes(searchItem.toLowerCase())
				)
			)
		}
	}, [searchItem])

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.currentTarget.value
				? setSearchItem(e.currentTarget.value)
				: setSearchUsernames(data?.usernames)
		}
	}

	return (
		<div className='flex flex-col gap-5'>
			<div className='flex items-center p-3 gap-3 bg-gray-blue rounded-xl'>
				<SearchIcon />

				<div>
					<Input
						placeholder='Enter a username...'
						onKeyDown={onKeyDown}
					/>
				</div>
			</div>

			<div className='flex items-center justify-between text-start text-sm px-2'>
				<span className='text-2xl font-bold'>Usernames</span>

				<TimeSortDropdown filter={timeSort} setFilter={setTimeSort} />
			</div>

			{isLoading ? (
				<Loader />
			) : (
				<div className='flex items-center justify-center border border-transparent rounded-xl overflow-hidden bg-gray-blue min-w-80 min-h-20'>
					{searchItem ? (
						searchUsernames?.length ? (
							<MarketUsernamesTable
								usernames={sortByTime(
									searchUsernames,
									timeSort
								)}
							/>
						) : (
							<span className='text-sm font-light opacity-40'>
								Usernames not found
							</span>
						)
					) : data ? (
						<MarketUsernamesTable
							usernames={sortByTime(data.usernames, timeSort)}
						/>
					) : (
						<span className='text-sm font-light opacity-40'>
							There's no usernames yet
						</span>
					)}
				</div>
			)}
		</div>
	)
}
