import { CircularProgress } from '@mui/material'
import { twMerge } from 'tailwind-merge'

export default function Loader({
	className,
	size,
}: {
	className?: string
	size?: number
}) {
	return (
		<div className={twMerge('flex items-center justify-center', className)}>
			<CircularProgress color='inherit' disableShrink size={size} />
		</div>
	)
}
