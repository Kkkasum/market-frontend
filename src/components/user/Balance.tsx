'use client'

import Link from 'next/link'
import { FC } from 'react'

import {
	ROUTE_DEPOSIT,
	ROUTE_HISTORY,
	ROUTE_SWAP,
	ROUTE_WITHDRAW,
} from '@/routes'
import { IUserWallet } from '@/types/user.type'
import TonIcon from '../ui/icons/TonIcon'
import UsdtIcon from '../ui/icons/UsdtIcon'
import DepositIcon from '../ui/icons/user/DepositIcon'
import HistoryIcon from '../ui/icons/user/HistoryIcon'
import SwapIcon from '../ui/icons/user/SwapIcon'
import WithdrawIcon from '../ui/icons/user/WithdrawIcon'
import Token from './Token'

interface Props extends IUserWallet {}

const Balance: FC<Props> = ({ tonBalance, tonUsdBalance, usdtBalance }) => {
	return (
		<>
			<div className='flex flex-col items-center justify-center gap-8 bg-gradient-to-r from-ocean-blue-from to-ocean-blue-to rounded-lg h-52 relative'>
				<Link href={ROUTE_HISTORY} className='absolute top-2 left-2'>
					<HistoryIcon />
				</Link>

				<span className='text-lg font-bold'>Balance</span>

				<p className='flex items-end font-medium gap-0.5'>
					<span className='text-5xl'>
						{`$${Math.trunc(tonUsdBalance + usdtBalance)}.`}
					</span>
					<span className='pb-[1px]'>
						{(tonUsdBalance + usdtBalance).toFixed(2).split('.')[1]}
					</span>
				</p>

				<div className='flex flex-row items-center justify-center gap-8 text-sm'>
					<Link
						href={ROUTE_DEPOSIT}
						className='flex flex-col items-center'
					>
						<DepositIcon />
						Deposit
					</Link>

					<Link
						href={ROUTE_WITHDRAW}
						className='flex flex-col items-center'
					>
						<WithdrawIcon />
						Withdraw
					</Link>

					<Link
						href={ROUTE_SWAP}
						className='flex flex-col items-center'
					>
						<SwapIcon />
						Swap
					</Link>
				</div>
			</div>

			<div className='flex flex-col gap-5'>
				<Token price={tonBalance} priceUsd={tonUsdBalance}>
					<TonIcon width={28} height={28} />
					<span>TON</span>
				</Token>

				<Token price={usdtBalance} priceUsd={usdtBalance}>
					<UsdtIcon width={28} height={28} />
					<span>USDT</span>
				</Token>
			</div>
		</>
	)
}

export default Balance
