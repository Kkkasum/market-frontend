import Image from 'next/image'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'

import { Asset } from '@/types/user.type'
import Button from '../ui/Button'
import Loader from '../ui/Loader'
import Modal from '../ui/Modal'
import TonIcon from '../ui/icons/TonIcon'
import UsdtIcon from '../ui/icons/UsdtIcon'

interface Props {
	modalOpen: boolean
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
	fromToken: string
	fromAmount: number
	toToken: string
	toAmount: number
	tokenRate: string
	showLoader: boolean
	isSuccess: boolean
}

const SwapModal: FC<Props> = ({
	modalOpen,
	setModalOpen,
	fromToken,
	fromAmount,
	toToken,
	toAmount,
	tokenRate,
	showLoader,
	isSuccess,
}) => {
	return (
		<Modal modalOpen={modalOpen} setModalOpen={setModalOpen} header='Swap'>
			<div className='flex flex-col gap-3 mb-3'>
				<div className='flex items-center justify-center gap-10 text-base font-medium'>
					<p className='flex flex-col items-center justify-between font-medium'>
						{fromToken === Asset.TON ? (
							<TonIcon width={24} height={24} />
						) : (
							<UsdtIcon width={24} height={24} />
						)}
						<span>{`${fromAmount} ${fromToken}`}</span>
					</p>

					<Image
						src='/right-caret.svg'
						alt=''
						width={20}
						height={20}
					/>

					<p className='flex flex-col items-center justify-between font-medium'>
						{toToken === Asset.TON ? (
							<TonIcon width={24} height={24} />
						) : (
							<UsdtIcon width={24} height={24} />
						)}
						<span>
							{toAmount?.toFixed(5)} {toToken}
						</span>
					</p>
				</div>

				<hr className='border border-solid border-white/10 w-full' />

				<p className='flex items-center justify-between'>
					<span>Rate</span>
					<span>{`1 ${fromToken} ≈ ${(+tokenRate).toFixed(
						3
					)} ${toToken}`}</span>
				</p>
			</div>

			<Button
				type='submit'
				className={twMerge(
					'w-full',
					isSuccess && 'border-green bg-green/30'
				)}
				disabled={showLoader || isSuccess}
			>
				{showLoader ? <Loader /> : isSuccess ? 'Success' : 'Confirm'}
			</Button>
		</Modal>
	)
}

export default SwapModal
