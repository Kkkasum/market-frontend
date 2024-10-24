import { FC } from 'react'

import WarningIcon from './icons/WarningIcon'

interface Props {
	text: string
}

const Warning: FC<Props> = ({ text }) => {
	return (
		<p className='flex items-center justify-center gap-1 bg-orange-400/10 rounded-xl p-3 w-full text-sm'>
			<WarningIcon />
			<span>{text}</span>
		</p>
	)
}

export default Warning
