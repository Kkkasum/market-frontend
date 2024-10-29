'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import LogoLoader from '@/components/ui/LogoLoader'
import { ROUTE_ONBOARDING, ROUTE_USER } from '@/routes'
import WebApp from '@twa-dev/sdk'
import useUser from './main/user/hooks/useUser'

export default function Page() {
	const [enabled, setEnabled] = useState<boolean>(false)

	let userId = 1
	if (typeof window !== 'undefined' && WebApp.initDataUnsafe.user?.id) {
		userId = WebApp.initDataUnsafe.user?.id
	}

	const { push } = useRouter()
	const { data, isLoading } = useUser(userId)

	// useEffect(() => {
	// 	if (
	// 		user?.id &&
	// 		validateInitData(webApp?.initData, process.env.BOT_TOKEN)
	// 	) {
	// 		console.log(1)
	// 		setEnabled(true)
	// 	}
	// }, [])

	useEffect(() => {
		if (!isLoading) {
			console.log(2)
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
