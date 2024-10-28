import WebApp from '@twa-dev/sdk'
import { FC, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import useBackButton from '@/hooks/useBackButton'
import { ROUTE_USER } from '@/routes'
import { INumberWithOwner } from '@/types/number.type'
import { formatAddress, formatNumber } from '@/utils/formatters'
import { StatusWallet } from '../market/Status'
import InstantSellNumberModal from '../modals/InstantSellNumberModal'
import PutNumberOnMarketModal from '../modals/PutNumberOnMarketModal'
import Button from '../ui/Button'

interface Props extends INumberWithOwner {}

const NumberWallet: FC<Props> = ({ id, number, address, ownerId }) => {
	const userId = WebApp.initDataUnsafe.user?.id || 1

	const [instantSellModalOpen, setInstantSellModalOpen] =
		useState<boolean>(false)
	const [putOnMarketModalOpen, setPutOnMarketModalOpen] =
		useState<boolean>(false)

	useBackButton(ROUTE_USER)

	return (
		<>
			<div
				className={twMerge(
					'flex flex-col items-center justify-center gap-5 font-semibold',
					(instantSellModalOpen || putOnMarketModalOpen) && 'blurred'
				)}
			>
				<p className='flex items-center gap-2'>
					<span className='text-2xl'>{formatNumber(number)}</span>
					<StatusWallet />
				</p>

				<p className='flex items-center justify-between font-medium w-full'>
					<span>Owner ID</span>
					<span>{ownerId}</span>
				</p>

				<p className='flex items-center justify-between font-medium w-full'>
					<span>Address</span>
					<a
						className='hover:text-blue transition-colors duration-300'
						href={`http://tonscan.org/address/${address}`}
						target='_blank'
					>
						{formatAddress(address)}
					</a>
				</p>
			</div>

			{userId === ownerId && (
				<>
					<div
						className={twMerge(
							'flex items-center justify-center fixed left-0 right-0 mx-auto bottom-0 w-full px-5 py-5 gap-5 bg-[#1A2026] font-bold',
							(instantSellModalOpen || putOnMarketModalOpen) &&
								'blurred'
						)}
					>
						<Button
							className='w-1/2'
							disabled={false}
							onClick={() => setInstantSellModalOpen(true)}
						>
							Instant sell
						</Button>

						<Button
							className='w-1/2'
							disabled={false}
							onClick={() => setPutOnMarketModalOpen(true)}
						>
							Put on market
						</Button>
					</div>

					<InstantSellNumberModal
						modalOpen={instantSellModalOpen}
						setModalOpen={setInstantSellModalOpen}
						number={number}
					/>

					<PutNumberOnMarketModal
						modalOpen={putOnMarketModalOpen}
						setModalOpen={setPutOnMarketModalOpen}
						numberId={id}
						number={number}
					/>
				</>
			)}
		</>
	)
}

export default NumberWallet
