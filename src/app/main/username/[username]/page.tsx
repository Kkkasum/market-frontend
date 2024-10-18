'use client'

import Loader from '@/components/ui/Loader'
import UsernameMarket from '@/components/username/UsernameMarket'
import UsernameWallet from '@/components/username/UsernameWallet'
import { UsernameStatus } from '@/types/username.type'
import useUsername from '../hooks/useUsername'

export default function Page({ params }: { params: { username: string } }) {
	const { username } = params

	const { data, isLoading } = useUsername(username)

	return isLoading ? (
		<Loader className='fixed bottom-0 left-0 w-full h-full' />
	) : data ? (
		data.status === UsernameStatus.WALLET ? (
			<UsernameWallet {...data} />
		) : (
			<UsernameMarket {...data} />
		)
	) : (
		<span>Username @{username} not found</span>
	)
}
