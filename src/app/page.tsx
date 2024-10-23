'use client'

// import { initData, useSignal } from '@telegram-apps/sdk-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import Circle from '@/components/ui/Circle'
import LogoIcon from '@/components/ui/icons/LogoIcon'
import { ROUTE_MARKET_NUMBERS, ROUTE_ONBOARDING } from '@/routes'
import { userId } from '@/utils/userId'
import { motion } from 'framer-motion'
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

	return (
		<motion.div
			animate={{ scale: [1, 1.05, 1.1, 1.05, 1] }}
			transition={{ repeat: Infinity, repeatDelay: 0.5 }}
			className='flex items-center justify-center fixed bottom-0 left-0 w-full h-full'
		>
			<Circle className='absolute bg-blue -z-50' />
			<LogoIcon width={100} height={100} />
		</motion.div>
	)
}
