import { FC, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import useUser from '@/app/main/user/hooks/useUser'
import useBuyUsername from '@/app/main/username/hooks/useBuyUsername'
import useRemoveUsername from '@/app/main/username/hooks/useRemoveUsername'
import useBackButton from '@/hooks/useBackButton'
import { ROUTE_MARKET_USERNAMES } from '@/routes'
import { IMarketUsername } from '@/types/market.type'
import { formatAddress, formatDate } from '@/utils/formatters'
import { StatusMarket } from '../market/Status'
import Button from '../ui/Button'
import Error from '../ui/Error'
import TonIcon from '../ui/icons/TonIcon'
import Loader from '../ui/Loader'
import Modal from '../ui/Modal'

interface Props extends IMarketUsername {}

const UsernameMarket: FC<Props> = ({
	id,
	username,
	address,
	price,
	createdAt,
	ownerId,
}) => {
	const userId = 6640542382 // fix

	const [modalOpen, setModalOpen] = useState<boolean>(false)

	const user = useUser(userId)
	const { buyUsername, isBuyPending, isError } = useBuyUsername(
		userId,
		username
	)
	const { removeUsername, isRemovePending } = useRemoveUsername(
		userId,
		username
	)

	useBackButton(ROUTE_MARKET_USERNAMES)

	return (
		<>
			<div
				className={twMerge(
					'flex flex-col items-center justify-center gap-5 font-semibold',
					modalOpen && 'blurred'
				)}
			>
				<p className='flex items-center gap-2'>
					<span className='text-2xl'>@{username}</span>
					<StatusMarket />
				</p>

				<p className='flex items-center justify-between font-medium w-full'>
					<span>Owner ID</span>
					<span>{ownerId}</span>
				</p>

				<p className='flex items-center justify-between font-medium w-full'>
					<span>Address</span>
					<a
						className='hover:text-blue transition-colors duration-300'
						href={`https://tonscan.org/address/${address}`}
						target='_blank'
					>
						{formatAddress(address)}
					</a>
				</p>

				<p className='flex items-center justify-between font-medium w-full'>
					<span>Price</span>
					<span className='flex items-center gap-1'>
						<TonIcon width={16} height={16} color='#4EB2FF' />
						{price}
					</span>
				</p>

				<p className='flex items-center justify-between font-medium w-full'>
					<span>On market since</span>
					<span>{formatDate(new Date(createdAt))}</span>
				</p>
			</div>

			{userId === ownerId ? (
				<div
					className={twMerge(
						'flex items-center justify-center fixed left-0 right-0 mx-auto bottom-0 w-full px-5 py-5 gap-5 bg-[#1A2026] font-bold',
						modalOpen && 'blurred'
					)}
				>
					<Button
						className='w-full'
						disabled={false}
						onClick={() => removeUsername(id)}
					>
						Remove from market
					</Button>
				</div>
			) : (
				<>
					<div
						className={twMerge(
							'flex items-center justify-center px-5 gap-5 absolute left-0 bottom-10 w-full',
							modalOpen && 'blurred'
						)}
					>
						<Button
							className='w-full'
							disabled={false}
							onClick={() => setModalOpen(true)}
						>
							Buy
						</Button>
					</div>

					<Modal
						modalOpen={modalOpen}
						setModalOpen={setModalOpen}
						header='Confirm'
					>
						{user.isLoading ? (
							<Loader />
						) : user.data ? (
							<>
								<div className='flex flex-col gap-3 mb-3'>
									<p className='flex items-center justify-between'>
										<span>Username</span>
										<span>@{username}</span>
									</p>

									<p className='flex items-center justify-between'>
										<span>Price</span>
										<span className='flex items-center gap-1'>
											<TonIcon
												width={16}
												height={16}
												color='#4EB2FF'
											/>
											{price}
										</span>
									</p>
								</div>

								<Button
									className={twMerge(
										'w-full',
										user.data.tonBalance < price &&
											'bg-red-700'
									)}
									disabled={
										isBuyPending ||
										user.data.tonBalance < price
									}
									onClick={() => buyUsername()}
								>
									{user.data.tonBalance < price ? (
										'Insufficient funds'
									) : isBuyPending ? (
										<Loader size={24} />
									) : (
										'Confirm'
									)}
								</Button>
							</>
						) : (
							<Error />
						)}
					</Modal>
				</>
			)}
		</>
	)
}

export default UsernameMarket
