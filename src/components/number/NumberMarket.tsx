import WebApp from '@twa-dev/sdk'
import { FC, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import useBuyNumber from '@/app/main/number/hooks/useBuyNumber'
import useRemoveNumber from '@/app/main/number/hooks/useRemoveNumber'
import useUser from '@/app/main/user/hooks/useUser'
import useBackButton from '@/hooks/useBackButton'
import { ROUTE_MARKET_NUMBERS } from '@/routes'
import { IMarketNumber } from '@/types/market.type'
import { formatAddress, formatDate, formatNumber } from '@/utils/formatters'
import Button from '../ui/Button'
import TonIcon from '../ui/icons/TonIcon'
import Loader from '../ui/Loader'
import Modal from '../ui/Modal'
import { StatusMarket } from '../ui/Status'

interface Props extends IMarketNumber {}

const NumberMarket: FC<Props> = ({
	id,
	number,
	address,
	price,
	createdAt,
	ownerId,
}) => {
	const userId = WebApp.initDataUnsafe.user?.id || 1

	const [modalOpen, setModalOpen] = useState<boolean>(false)

	const user = useUser(userId)
	const { buyNumber, isBuyPending, isError } = useBuyNumber(userId, number)
	const { removeNumber, isRemovePending } = useRemoveNumber(userId, number)

	useBackButton(ROUTE_MARKET_NUMBERS)

	return (
		<>
			<div
				className={twMerge(
					'flex flex-col items-center justify-center gap-5 font-semibold',
					modalOpen && 'blurred'
				)}
			>
				<p className='flex items-center gap-2'>
					<span className='text-2xl'>{formatNumber(number)}</span>
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
						href={`http://tonscan.com/address/${address}`}
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
						'flex items-center justify-center fixed left-0 right-0 mx-auto bottom-0 w-full px-5 py-5 bg-[#1A2026] font-bold',
						modalOpen && 'blurred'
					)}
				>
					<Button
						className='w-full'
						disabled={false}
						onClick={() => removeNumber(id)}
					>
						Remove from market
					</Button>
				</div>
			) : (
				<>
					<div
						className={twMerge(
							'flex items-center justify-center fixed left-0 right-0 mx-auto bottom-0 w-full px-5 py-5 bg-[#1A2026] font-bold',
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
										<span>Number</span>
										<span>{formatNumber(number)}</span>
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
										'w-full font-bold',
										(user.data.tonBalance < price ||
											isError) &&
											'bg-red-700'
									)}
									disabled={
										isBuyPending ||
										user.data.tonBalance < price ||
										isError
									}
									onClick={() =>
										buyNumber({
											userId: userId,
											number: number,
										})
									}
								>
									{user.data.tonBalance < price ? (
										'Insufficient funds'
									) : isBuyPending ? (
										<Loader size={24} />
									) : isError ? (
										'Insufficient funds'
									) : (
										'Confirm'
									)}
								</Button>
							</>
						) : (
							<span>Something's gone wrong. Try again later</span>
						)}
					</Modal>
				</>
			)}
		</>
	)
}

export default NumberMarket
