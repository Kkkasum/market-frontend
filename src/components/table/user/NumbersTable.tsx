import { useRouter } from 'next/navigation'
import { FC } from 'react'

import { StatusMarket, StatusWallet } from '@/components/ui/Status'
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
					className='bg-dark hover:bg-gray-blue cursor-pointer border-b-[1px] border-black relative right-caret'
					onClick={() => push(ROUTE_NUMBER + `/${n.number}`)}
				>
					<th className='text-start font-medium'>
						{formatNumber(n.number)}
					</th>
					<td>
						{n.status === NumberStatus.MARKET ? (
							<StatusMarket />
						) : (
							<StatusWallet />
						)}
					</td>
				</tr>
			))}
		</Table>
	)
}

export default NumbersTable
