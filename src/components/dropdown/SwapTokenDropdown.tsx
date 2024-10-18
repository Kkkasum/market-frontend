import { CheckIcon } from '@radix-ui/react-icons'
import { FC } from 'react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/Dropdown'

interface Props {
	selectedToken: string
	changeToken: (newToken: string, selectedToken: string) => void
}

const SwapTokenDropdown: FC<Props> = ({ selectedToken, changeToken }) => {
	const availableTokens = ['TON', 'USDT']

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='flex items-center opacity-60 select-none cursor-pointer relative right-caret pr-7 outline-none hover:opacity-100 transition-opacity duration-300'>
				<span>{selectedToken}</span>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				className='flex flex-col items-center justify-center gap-3 p-2 bg-gray-blue text-lg rounded-xl border border-solid border-white/10 w-24 mr-5 text-white'
				align='end'
			>
				{availableTokens.map(availableToken => (
					<DropdownMenuItem
						key={availableToken}
						className='flex items-center justify-between w-full outline-none'
						onClick={() =>
							changeToken(availableToken, selectedToken)
						}
					>
						<span>
							{selectedToken === availableToken && (
								<CheckIcon width={20} height={20} />
							)}
						</span>
						<span>{availableToken}</span>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default SwapTokenDropdown
