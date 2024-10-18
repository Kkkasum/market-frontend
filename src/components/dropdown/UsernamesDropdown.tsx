import { ChevronDownIcon } from '@radix-ui/react-icons'
import { FC } from 'react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/Dropdown'
import { IUsername } from '@/types/username.type'

interface Props {
	usernames?: IUsername[]
	username?: string
	setUsername: React.Dispatch<React.SetStateAction<string | undefined>>
}

const UsernamesDropdown: FC<Props> = ({ usernames, username, setUsername }) => {
	return (
		<div className='flex flex-col items-start gap-1 w-full'>
			<span className='text-lg font-bold'>Select username</span>

			<DropdownMenu>
				<DropdownMenuTrigger className='flex items-center justify-between p-3 bg-gray-blue rounded-xl w-full outline-none'>
					{username ? (
						<span>@{username}</span>
					) : (
						<span className='opacity-60'>Username</span>
					)}

					<ChevronDownIcon />
				</DropdownMenuTrigger>

				<DropdownMenuContent className='w-[90vw] text-start text-white bg-gray-blue border-transparent rounded-xl'>
					{usernames ? (
						usernames.map(username => (
							<DropdownMenuItem
								key={username.id}
								onClick={() => setUsername(username.username)}
							>
								@{username.username}
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

export default UsernamesDropdown
