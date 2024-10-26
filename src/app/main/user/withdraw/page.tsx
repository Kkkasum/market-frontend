'use client'

import WebApp from '@twa-dev/sdk'
import { useEffect, useState } from 'react'

import AssetDropdown from '@/components/dropdown/AssetDropdown'
import Loader from '@/components/ui/Loader'
import NumberForm from '@/components/user/withdraw/NumberForm'
import TonForm from '@/components/user/withdraw/TonForm'
import UsdtForm from '@/components/user/withdraw/UsdtForm'
import UsernameForm from '@/components/user/withdraw/UsernameForm'
import { Asset } from '@/types/user.type'
import useUser from '../hooks/useUser'

export interface IForm {
	address: string
	amount?: number
}

export default function Page() {
	let userId = 1
	if (typeof window !== 'undefined') {
		userId = WebApp.initDataUnsafe.user?.id || 1
	}

	const [asset, setAsset] = useState<Asset>()
	const { data, isLoading } = useUser(userId)

	useEffect(() => {
		WebApp.BackButton.show()
	}, [])

	return isLoading ? (
		<Loader className='fixed bottom-0 left-0 w-full h-full' />
	) : data ? (
		<div className='flex flex-col gap-10 w-full'>
			<div className='flex flex-col items-start gap-1 w-full'>
				<span className='text-lg font-bold'>Choose asset</span>
				<AssetDropdown asset={asset} setAsset={setAsset} />
			</div>

			{asset &&
				(asset === Asset.NUMBER ? (
					data.numbers ? (
						<NumberForm userId={userId} numbers={data.numbers} />
					) : (
						<span>You have no numbers yet</span>
					)
				) : asset === Asset.USERNAME ? (
					data.usernames ? (
						<UsernameForm
							userId={userId}
							usernames={data.usernames}
						/>
					) : (
						<span>You have no usernames yet</span>
					)
				) : asset === Asset.TON ? (
					<TonForm userId={userId} tonBalance={data.tonBalance} />
				) : (
					<UsdtForm userId={userId} usdtBalance={data.usdtBalance} />
				))}
		</div>
	) : (
		<span>Something's gone wrong. Try again later</span>
	)
}