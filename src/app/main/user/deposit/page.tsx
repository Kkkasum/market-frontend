'use client'

import { useState } from 'react'

import AssetDropdown from '@/components/dropdown/AssetDropdown'
import Loader from '@/components/ui/Loader'
import NumberDep from '@/components/user/deposit/NumberDep'
import TokenDep from '@/components/user/deposit/TokenDep'
import UsernameDep from '@/components/user/deposit/UsernameDep'
import { Asset } from '@/types/user.type'
import useDepositAddress from '../hooks/deposit/useDepositAddress'

export default function Page() {
	const [asset, setAsset] = useState<Asset>()
	const { data, isLoading } = useDepositAddress()

	return isLoading ? (
		<Loader />
	) : data ? (
		<div className='flex flex-col gap-10 w-full'>
			<div className='flex flex-col items-start gap-1 w-full'>
				<span className='text-lg font-bold'>Choose asset</span>
				<AssetDropdown asset={asset} setAsset={setAsset} />
			</div>

			{asset &&
				(asset === Asset.NUMBER ? (
					<NumberDep />
				) : asset === Asset.USERNAME ? (
					<UsernameDep />
				) : (
					<TokenDep
						token={asset}
						depositAddress={data.depositAddress}
					/>
				))}
		</div>
	) : (
		<span>Something's gone wrong. Try again later</span>
	)
}
