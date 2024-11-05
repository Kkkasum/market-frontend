'use client'

import WebApp from '@twa-dev/sdk'
import { useState } from 'react'

import AssetDropdown from '@/components/dropdown/AssetDropdown'
import RubDeposit from '@/components/user/deposit/RubDeposit'
import TonDeposit from '@/components/user/deposit/TonDeposit'
import TronDeposit from '@/components/user/deposit/TronDeposit'
import useBackButton from '@/hooks/useBackButton'
import { Asset } from '@/types/user.type'

export default function Page() {
	let userId = 1
	if (typeof window !== 'undefined' && WebApp.initDataUnsafe.user?.id) {
		userId = WebApp.initDataUnsafe.user?.id
	}

	const [asset, setAsset] = useState<Asset>()

	useBackButton()

	return (
		<div className='flex flex-col gap-5 w-full'>
			<div className='flex flex-col items-start gap-1 w-full'>
				<span className='text-lg font-bold'>Choose asset</span>
				<AssetDropdown asset={asset} setAsset={setAsset} />
			</div>

			{asset === Asset.RUB ? (
				<RubDeposit userId={userId} />
			) : asset === Asset.USDT ? (
				<TronDeposit userId={userId} />
			) : asset ? (
				<TonDeposit userId={userId} asset={asset} />
			) : (
				<></>
			)}
		</div>
	)
}
