'use client'

// import { initData, useSignal } from '@telegram-apps/sdk-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import LogoLoader from '@/components/ui/LogoLoader'
import { ROUTE_MARKET_NUMBERS, ROUTE_ONBOARDING } from '@/routes'
import { userId } from '@/utils/userId'
import useUser from './main/user/hooks/useUser'

export default function Page() {
	// const initDataState = useSignal(initData.state)
	// const userId2 = initDataState?.user?.id
	// console.log(userId2)

	const { push } = useRouter()
	const { data, isLoading } = useUser(userId)

	useEffect(() => {
		if (!isLoading) {
			setTimeout(() => {
				if (data) {
					push(ROUTE_MARKET_NUMBERS)
				} else {
					push(ROUTE_ONBOARDING)
				}
			}, 2000)
		}
	}, [isLoading])

	return <LogoLoader />
}
