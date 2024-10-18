import { FC } from 'react'

import { INumber } from '@/types/number.type'
import { IUsername } from '@/types/username.type'
import NumbersTable from '../table/user/NumbersTable'
import UsernamesTable from '../table/user/UsernamesTable'
import Tabs from '../ui/Tabs'

interface Props {
	numbers?: INumber[]
	usernames?: IUsername[]
}

const UserTabs: FC<Props> = ({ numbers, usernames }) => {
	const tabs = [
		{
			label: 'Numbers',
			value: 'numbers',
			content: (
				<div
					key='numbers'
					className='flex items-center justify-center border border-transparent rounded-xl overflow-hidden bg-gray-blue min-w-80 min-h-20'
				>
					{numbers?.length ? (
						<NumbersTable numbers={numbers} />
					) : (
						<span className='text-sm font-light opacity-40'>
							You have no numbers yet
						</span>
					)}
				</div>
			),
		},
		{
			label: 'Usernames',
			value: 'usernames',
			content: (
				<div
					key='usernames'
					className='flex items-center justify-center border border-transparent rounded-xl overflow-hidden bg-gray-blue min-w-80 min-h-20'
				>
					{usernames?.length ? (
						<UsernamesTable usernames={usernames} />
					) : (
						<span className='text-sm font-light opacity-40'>
							You have no usernames yet
						</span>
					)}
				</div>
			),
		},
	]

	return <Tabs tabs={tabs} />
}

export default UserTabs
