import { FC } from 'react'

interface Props {
	fields: string[]
	children: React.ReactNode
}

const Table: FC<Props> = ({ fields, children }) => {
	return (
		<table
			className='w-full text-sm border-collapse text-start'
			cellPadding={16}
		>
			<thead className='bg-gray-blue text-gray-text'>
				<tr className=''>
					{fields.map(field => (
						<th key={field} scope='col' className='text-start'>
							{field}
						</th>
					))}
				</tr>
			</thead>

			<tbody>{children}</tbody>
		</table>
	)
}

export default Table
