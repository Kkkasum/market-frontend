import { useRouter } from 'next/navigation'
import { FC } from 'react'

import { StatusMarket, StatusWallet } from '@/components/market/Status'
import Table from '@/components/ui/Table'
import { ROUTE_USERNAME } from '@/routes'
import { IUsername, UsernameStatus } from '@/types/username.type'

interface Props {
	usernames: IUsername[]
}

const UsernamesTable: FC<Props> = ({ usernames }) => {
	const { push } = useRouter()
	const fields = ['Username', 'Status']

	return (
		<Table fields={fields}>
			{usernames.map(n => (
				<tr
					key={n.id}
					className='bg-dark hover:bg-gray-blue cursor-pointer border-b-[1px] border-black'
					onClick={() => push(ROUTE_USERNAME + `/${n.username}`)}
				>
					<th className='text-start font-medium'>@{n.username}</th>

					<td className='relative'>
						<p className='right-caret'>
							{n.status === UsernameStatus.MARKET ? (
								<StatusMarket />
							) : (
								<StatusWallet />
							)}
						</p>
					</td>
				</tr>
			))}
		</Table>
	)
}

export default UsernamesTable
