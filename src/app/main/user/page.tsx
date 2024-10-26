'use client'

import WebApp from '@twa-dev/sdk'
import { useEffect, useState } from 'react'

import LogoLoader from '@/components/ui/LogoLoader'
import Balance from '@/components/user/Balance'
import UserTabs from '@/components/user/UserTabs'
import useUser from './hooks/useUser'

export default function Page() {
	let userId = 1
	if (typeof window !== 'undefined') {
		userId = WebApp.initDataUnsafe.user?.id || 1
	}

	const { data, isFetching } = useUser(userId)
	const [showLoader, setShowLoader] = useState<boolean>(true)

	useEffect(() => {
		WebApp.BackButton.show()
	}, [])

	useEffect(() => {
		if (isFetching) {
			setTimeout(() => {
				setShowLoader(false)
			}, 1000)
		}
	}, [isFetching])

	return showLoader ? (
		<LogoLoader />
	) : (
		<div className='flex flex-col justify-center w-full mb-5 gap-5'>
			<>
				{data ? <Balance {...data} /> : <span>Balance not loaded</span>}

				<UserTabs numbers={data?.numbers} usernames={data?.usernames} />
			</>
		</div>
	)
}
