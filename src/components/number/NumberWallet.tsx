import { FC, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { INumberWithOwner } from '@/types/number.type'
import { Asset } from '@/types/user.type'
import { formatAddress, formatNumber } from '@/utils/formatters'
import { userId } from '@/utils/userId'
import InstantSellModal from '../modals/InstantSellModal'
import PutNumberOnMarketModal from '../modals/PutNumberOnMarketModal'
import Button from '../ui/Button'
import { StatusWallet } from '../ui/Status'

interface Props extends INumberWithOwner {}

const NumberWallet: FC<Props> = ({ id, number, address, ownerId }) => {
	const [instantSellModalOpen, setInstantSellModalOpen] =
		useState<boolean>(false)
	const [putOnMarketModalOpen, setPutOnMarketModalOpen] =
		useState<boolean>(false)

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
						href={`http://tonviewer.com/${address}`}
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
							'flex items-center justify-center px-5 gap-5 absolute left-0 bottom-10 w-full',
							(instantSellModalOpen || putOnMarketModalOpen) &&
								'blurred'
						)}
					>
						<Button
							disabled={false}
							onClick={() => setInstantSellModalOpen(true)}
						>
							Instant sell
						</Button>

						<Button
							disabled={false}
							onClick={() => setPutOnMarketModalOpen(true)}
						>
							Put on market
						</Button>
					</div>

					<InstantSellModal
						modalOpen={instantSellModalOpen}
						setModalOpen={setInstantSellModalOpen}
						asset={Asset.NUMBER}
						assetValue={formatNumber(number)}
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
