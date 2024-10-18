import { useRouter } from 'next/navigation'
import { FC } from 'react'

import TonIcon from '@/components/ui/icons/TonIcon'
import Table from '@/components/ui/Table'
import { ROUTE_USERNAME } from '@/routes'
import { IMarketUsername } from '@/types/market.type'

interface Props {
	usernames: IMarketUsername[]
}

const MarketUsernamesTable: FC<Props> = ({ usernames }) => {
	const { push } = useRouter()
	const fields = ['Username', 'Price']

	return (
		<Table fields={fields}>
			{usernames.map(n => (
				<tr
					key={n.id}
					className='bg-dark hover:bg-gray-blue cursor-pointer border-b-[1px] border-black relative right-caret'
					onClick={() => push(ROUTE_USERNAME + `/${n.username}`)}
				>
					<th className='text-start font-medium'>@{n.username}</th>
					<td className='flex items-center gap-1'>
						<TonIcon width={16} height={16} color='#4EB2FF' />
						{n.price}
					</td>
				</tr>
			))}
		</Table>
	)
}

export default MarketUsernamesTable
