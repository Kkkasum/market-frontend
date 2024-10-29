'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import LogoLoader from '@/components/ui/LogoLoader'
import { useTelegram } from '@/hooks/useTelegram'
import { ROUTE_ONBOARDING, ROUTE_USER } from '@/routes'
import validateInitData from '@/utils/validateInitData'
import useUser from './main/user/hooks/useUser'

export default function Page() {
	const [enabled, setEnabled] = useState<boolean>(false)

	const { user, webApp } = useTelegram()
	const { push } = useRouter()
	const { data, isLoading } = useUser(user?.id)

	useEffect(() => {
		if (
			user?.id &&
			validateInitData(webApp?.initData, process.env.BOT_TOKEN)
		) {
			console.log(1)
			setEnabled(true)
		}
	}, [])

	useEffect(() => {
		if (enabled && !isLoading) {
			console.log(2)
			setTimeout(() => {
				if (data) {
					push(ROUTE_USER)
				} else {
					push(ROUTE_ONBOARDING)
				}
			}, 2000)
		}
	}, [enabled])

	return <LogoLoader />
}
