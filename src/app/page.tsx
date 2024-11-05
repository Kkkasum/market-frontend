'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import LogoLoader from '@/components/ui/LogoLoader'
import { ROUTE_ONBOARDING, ROUTE_USER } from '@/routes'
import WebApp from '@twa-dev/sdk'
import useUser from './main/user/hooks/useUser'

export default function Page() {
	let userId = 1
	if (typeof window !== 'undefined' && WebApp.initDataUnsafe.user?.id) {
		userId = WebApp.initDataUnsafe.user?.id
	}

	const { push } = useRouter()
	const { data, isLoading } = useUser(userId)

	useEffect(() => {
		if (!isLoading) {
			setTimeout(() => {
				if (data) {
					push(ROUTE_USER)
				} else {
					push(ROUTE_ONBOARDING)
				}
			}, 2000)
		}
	}, [isLoading])

	return <LogoLoader />
}
