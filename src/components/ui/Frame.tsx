import { FC } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
	className?: string
	children: React.ReactNode
}

const Frame: FC<Props> = ({ className, children }) => {
	return (
		<div
			className={twMerge(
				'flex items-center justify-between bg-gray-blue rounded-xl pl-5 gap-3 w-full h-24',
				className
			)}
		>
			{children}
		</div>
	)
}

export default Frame
