'use client'

import { parseInitData } from '@telegram-apps/sdk-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import LogoLoader from '@/components/ui/LogoLoader'
import { ROUTE_MARKET_NUMBERS, ROUTE_ONBOARDING } from '@/routes'
import useUser from './main/user/hooks/useUser'

export default function Page() {
	let userId = 1
	if (typeof window !== 'undefined') {
		userId = parseInitData(1).user?.id || 1
	}

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
