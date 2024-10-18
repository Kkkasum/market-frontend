import { FC, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import useBuyNumber from '@/app/main/number/hooks/useBuyNumber'
import useRemoveNumber from '@/app/main/number/hooks/useRemoveNumber'
import useUser from '@/app/main/user/hooks/useUser'
import { IMarketNumber } from '@/types/market.type'
import { formatAddress, formatDate, formatNumber } from '@/utils/formatters'
import { userId } from '@/utils/userId'
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
	const [modalOpen, setModalOpen] = useState<boolean>(false)

	const user = useUser(userId)
	const { buyNumber, isBuyPending } = useBuyNumber(userId, number)
	const { removeNumber, isRemovePending } = useRemoveNumber(userId, number)

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
						href={`http://tonviewer.com/${address}`}
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
						'flex items-center justify-center px-5 gap-5 absolute left-0 bottom-10 w-full',
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
										'w-full',
										user.data.tonBalance < price &&
											'bg-red-700'
									)}
									disabled={
										isBuyPending ||
										user.data.tonBalance < price
									}
									onClick={() => buyNumber()}
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
							<span>Something's gone wrong. Try again later</span>
						)}
					</Modal>
				</>
			)}
		</>
	)
}

export default NumberMarket
