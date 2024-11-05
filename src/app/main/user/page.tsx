'use client'

import WebApp from '@twa-dev/sdk'

import Loader from '@/components/ui/Loader'
import Balance from '@/components/user/Balance'
import UserTabs from '@/components/user/UserTabs'
import validateInitData from '@/utils/validateInitData'
import useUser from './hooks/useUser'

export default function Page() {
	let userId = 1
	if (typeof window !== 'undefined' && WebApp.initDataUnsafe.user?.id) {
		userId = WebApp.initDataUnsafe.user?.id

		console.log(
			validateInitData(
				WebApp.initData,
				'7263023196:AAEUAtCibJXqPgnUC1mTOkkjr1V-2eiZGjk'
			)
		)
	}

	const { data, isLoading } = useUser(userId)

	return isLoading ? (
		<Loader className='fixed bottom-0 left-0 w-full h-full' />
	) : (
		<div className='flex flex-col justify-center w-full mb-5 gap-5'>
			<>
				{data ? <Balance {...data} /> : <span>Balance not loaded</span>}

				<UserTabs numbers={data?.numbers} usernames={data?.usernames} />
			</>
		</div>
	)
}
