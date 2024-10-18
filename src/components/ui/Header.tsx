import Link from 'next/link'

import {
	ROUTE_MARKET_NUMBERS,
	ROUTE_MARKET_USERNAMES,
	ROUTE_USER,
} from '@/routes'
import WalletIcon from './icons/WalletIcon'

export default function Header() {
	return (
		<header className='flex items-center justify-between fixed top-0 right-0 left-0 bottom-auto px-5 py-2 border-solid border-b-2 border-white/10 bg-gray-blue z-50 font-medium'>
			{/* <Link href={ROUTE_MARKET}> */}
			<span>UseTON</span>
			{/* </Link> */}

			<div className='flex flex-row items-center justify-center gap-5'>
				<Link href={ROUTE_MARKET_NUMBERS}>Numbers</Link>

				<Link href={ROUTE_MARKET_USERNAMES}>Usernames</Link>

				<Link href={ROUTE_USER}>
					<WalletIcon width={18} height={18} color='white' />
				</Link>
			</div>
		</header>
	)
}
