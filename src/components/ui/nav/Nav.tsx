import {
	ROUTE_USER,
	ROUTE_USER_DEPOSIT,
	ROUTE_USER_HISTORY,
	ROUTE_USER_SWAP,
	ROUTE_USER_WITHDRAW,
} from '@/routes'
import DepositIcon from '../icons/user/DepositIcon'
import HistoryIcon from '../icons/user/HistoryIcon'
import SwapIcon from '../icons/user/SwapIcon'
import WithdrawIcon from '../icons/user/WithdrawIcon'
import WalletIcon from '../icons/WalletIcon'
import NavLink from './NavLink'

export default function Nav() {
	return (
		<div className='flex items-center justify-center gap-2.5 p-1 mx-2 fixed right-0 left-0 top-auto z-50 text-xs font-normal bg-white/5 rounded-xl border border-solid border-white/10'>
			<NavLink
				href={ROUTE_USER_HISTORY}
				svg={<HistoryIcon />}
				text='History'
			/>

			<NavLink
				href={ROUTE_USER_DEPOSIT}
				svg={<DepositIcon />}
				text='Deposit'
			/>

			<NavLink
				href={ROUTE_USER}
				svg={<WalletIcon width={24} height={24} color='#fff' />}
				text='Wallet'
			/>

			<NavLink
				href={ROUTE_USER_WITHDRAW}
				svg={<WithdrawIcon />}
				text='Withdraw'
			/>

			<NavLink href={ROUTE_USER_SWAP} svg={<SwapIcon />} text='Swap' />
		</div>
	)
}
