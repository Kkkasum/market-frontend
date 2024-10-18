import { FC } from 'react'

import Input from '../ui/Input'
import SearchIcon from '../ui/icons/SearchIcon'

interface Props {
	prefix?: string
	placeholder: string
}

const Search: FC<Props> = ({ prefix, placeholder }) => {
	return (
		<div className='flex items-center p-3 gap-3 bg-gray-blue rounded-xl'>
			<SearchIcon />

			<div className='flex items-center gap-3'>
				{prefix ? <span>{prefix}</span> : <></>}

				<Input placeholder={placeholder} />
			</div>
		</div>
	)
}

export default Search
