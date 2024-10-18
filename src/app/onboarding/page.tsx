'use client'

import { useRouter } from 'next/navigation'

import Button from '@/components/ui/Button'
import NumberIcon from '@/components/ui/icons/NumberIcon'
import UsernameIcon from '@/components/ui/icons/UsernameIcon'
import WalletIcon from '@/components/ui/icons/WalletIcon'
import { ROUTE_MARKET_NUMBERS } from '@/routes'
import { userId } from '@/utils/userId'
import useAddUser from './hooks/useAddUser'

export default function Page() {
	const { push } = useRouter()
	const { addUser } = useAddUser(userId)

	const onClickStart = async () => {
		await addUser({ userId: userId })
		push(ROUTE_MARKET_NUMBERS)
	}

	return (
		<>
			<div className='flex relative h-48 mx-5 mt-32'>
				<div className='absolute left-0 top-5 flex flex-col items-center gap-3 bg-gradient-to-br from-quepal-from to-quepal-to rounded-xl w-28 p-3 z-50'>
					<p className='p-3 rounded-full bg-white'>
						<UsernameIcon />
					</p>

					<p className='flex flex-col items-center font-bold'>
						<span>Telegram</span>
						<span>usernames</span>
					</p>
				</div>

				<div className='absolute left-0 right-0 mx-auto flex flex-col items-center gap-3 bg-gradient-to-br from-ocean-blue-from to-ocean-blue-to rounded-xl w-28 p-3'>
					<p className='p-3 rounded-full bg-white'>
						<WalletIcon width={54} height={54} color='black' />
					</p>

					<p className='flex flex-col items-center font-bold'>
						<span>Custodial</span>
						<span>wallet</span>
					</p>
				</div>

				<div className='absolute right-0 top-5 flex flex-col items-center gap-3 bg-gradient-to-br from-green-beach-from to-green-beach-to rounded-xl w-28 p-3 z-40 border border-solid border-white/10'>
					<p className='p-3 rounded-full bg-white'>
						<NumberIcon />
					</p>

					<p className='flex flex-col items-center font-bold'>
						<span>Anonymous</span>
						<span>numbers</span>
					</p>
				</div>
			</div>

			<p className='flex flex-col items-center gap-3 text-lg font-bold bottom-0'>
				<span>Deposit TON, USDt, USDT-TRC20</span>
				<span>Buy and Sell usernames and numbers</span>
			</p>

			<div className='flex items-center justify-center px-5 gap-5 absolute left-0 bottom-10 w-full font-bold'>
				<Button
					className='flex items-center justify-center py-3 bg-blue rounded-xl w-full'
					onClick={onClickStart}
				>
					START
				</Button>
			</div>
		</>
	)
}
