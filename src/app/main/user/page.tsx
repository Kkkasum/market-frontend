'use client'

import Loader from '@/components/ui/Loader'
import Balance from '@/components/user/Balance'
import UserTabs from '@/components/user/UserTabs'
import { userId } from '@/utils/userId'
import useUser from './hooks/useUser'

export default function Page() {
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
