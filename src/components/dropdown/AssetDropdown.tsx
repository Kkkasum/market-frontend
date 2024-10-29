import { ChevronDownIcon } from '@radix-ui/react-icons'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'

import TelegramIcon from '@/components/ui/icons/TelegramIcon'
import TonIcon from '@/components/ui/icons/TonIcon'
import UsdtIcon from '@/components/ui/icons/UsdtIcon'
import { Asset } from '@/types/user.type'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/Dropdown'

interface Props {
	asset?: Asset
	setAsset: React.Dispatch<React.SetStateAction<Asset | undefined>>
}

const AssetDropdown: FC<Props> = ({ asset, setAsset }) => {
	const assets = [
		{
			svg: <TonIcon width={24} height={24} />,
			value: Asset.TON,
		},
		{
			svg: <UsdtIcon width={24} height={24} />,
			value: Asset.USDT,
		},
		{
			svg: <TelegramIcon />,
			value: Asset.NUMBER,
		},
		{
			svg: <TelegramIcon />,
			value: Asset.USERNAME,
		},
	]

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='flex items-center justify-between p-3 bg-gray-blue rounded-xl w-full outline-none'>
				{asset ? (
					<span>{asset}</span>
				) : (
					<span className='opacity-60'>Asset</span>
				)}

				<ChevronDownIcon />
			</DropdownMenuTrigger>

			<DropdownMenuContent
				className='w-[90vw] text-start text-white bg-gray-blue border-transparent rounded-xl'
				align='start'
			>
				{assets.map(item => (
					<DropdownMenuItem
						key={item.value}
						className={twMerge(
							'gap-2 h-11 px-3',
							item.value === asset && 'asset-checked'
						)}
						onClick={() => setAsset(item.value)}
					>
						{item.svg}
						{item.value}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default AssetDropdown
