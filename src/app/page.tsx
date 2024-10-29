'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import LogoLoader from '@/components/ui/LogoLoader'
import { useTelegram } from '@/hooks/useTelegram'
import { ROUTE_ONBOARDING, ROUTE_USER } from '@/routes'
import validateInitData from '@/utils/validateInitData'
import useUser from './main/user/hooks/useUser'

export default function Page() {
	const { user, webApp } = useTelegram()
	const { push } = useRouter()
	const { data, isLoading } = useUser(user?.id || 1)

	useEffect(() => {
		if (!isLoading) {
			if (
				validateInitData(
					webApp?.initData,
					'7263023196:AAEUAtCibJXqPgnUC1mTOkkjr1V-2eiZGjk'
				)
			) {
				setTimeout(() => {
					if (data) {
						push(ROUTE_USER)
					} else {
						push(ROUTE_ONBOARDING)
					}
				}, 2000)
			}
		}
	}, [isLoading])

	return <LogoLoader />
}
