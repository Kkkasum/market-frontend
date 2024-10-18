import { useRouter } from 'next/navigation'
import { FC } from 'react'

import TonIcon from '@/components/ui/icons/TonIcon'
import Table from '@/components/ui/Table'
import { ROUTE_NUMBER } from '@/routes'
import { IMarketNumber } from '@/types/market.type'
import { formatNumber } from '@/utils/formatters'

interface Props {
	numbers: IMarketNumber[]
}

const MarketNumbersTable: FC<Props> = ({ numbers }) => {
	const { push } = useRouter()
	const fields = ['Number', 'Price']

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
					<td className='flex items-center gap-1'>
						<TonIcon width={16} height={16} color='#4EB2FF' />
						{n.price}
					</td>
				</tr>
			))}
		</Table>
	)
}

export default MarketNumbersTable
