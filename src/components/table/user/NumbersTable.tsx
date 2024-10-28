import { useRouter } from 'next/navigation'
import { FC } from 'react'

import { StatusMarket, StatusWallet } from '@/components/market/Status'
import Table from '@/components/ui/Table'
import { ROUTE_NUMBER } from '@/routes'
import { INumber, NumberStatus } from '@/types/number.type'
import { formatNumber } from '@/utils/formatters'

interface Props {
	numbers: INumber[]
}

const NumbersTable: FC<Props> = ({ numbers }) => {
	const { push } = useRouter()
	const fields = ['Number', 'Status']

	return (
		<Table fields={fields}>
			{numbers.map(n => (
				<tr
					key={n.id}
					className='bg-dark hover:bg-gray-blue cursor-pointer border-b-[1px] border-black'
					onClick={() => push(ROUTE_NUMBER + `/${n.number}`)}
				>
					<th className='text-start font-medium'>
						{formatNumber(n.number)}
					</th>
					<td className='relative'>
						<p className='right-caret'>
							{n.status === NumberStatus.MARKET ? (
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

export default NumbersTable
