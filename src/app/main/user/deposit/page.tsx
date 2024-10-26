'use client'

import { useEffect, useState } from 'react'

import AssetDropdown from '@/components/dropdown/AssetDropdown'
import Deposit from '@/components/user/deposit/Deposit'
import useBackButton from '@/hooks/useBackButton'
import { ROUTE_USER } from '@/routes'
import { NETWORK } from '@/types/deposit.type'
import { Asset } from '@/types/user.type'

export default function Page() {
	const [asset, setAsset] = useState<Asset>()
	const [network, setNetwork] = useState<NETWORK>()

	useBackButton(ROUTE_USER)

	useEffect(() => {
		if (asset === Asset.USDT) {
			setNetwork(NETWORK.TRON)
		} else {
			setNetwork(NETWORK.TON)
		}
	}, [asset])

	return (
		<div className='flex flex-col gap-5 w-full'>
			<div className='flex flex-col items-start gap-1 w-full'>
				<span className='text-lg font-bold'>Choose asset</span>
				<AssetDropdown asset={asset} setAsset={setAsset} />
			</div>

			{asset && network && <Deposit asset={asset} network={network} />}
		</div>
	)
}
