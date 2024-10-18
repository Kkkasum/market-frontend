'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import Loader from '@/components/ui/Loader'
import { ROUTE_MARKET_NUMBERS, ROUTE_ONBOARDING } from '@/routes'
import { userId } from '@/utils/userId'
import useUser from './main/user/hooks/useUser'

export default function Page() {
	const { push } = useRouter()
	const { data, isLoading } = useUser(userId)

	useEffect(() => {
		if (!isLoading) {
			setTimeout(() => {
				if (data?.tonBalance === 0) {
					push(ROUTE_MARKET_NUMBERS)
				} else {
					push(ROUTE_ONBOARDING)
				}
			}, 2000)
		}
	}, [isLoading])

	return <Loader className='fixed bottom-0 left-0 w-full h-full' />
}
