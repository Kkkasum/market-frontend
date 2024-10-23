import { twMerge } from 'tailwind-merge'

export default function Circle({ className }: { className: string }) {
	return (
		<div
			className={twMerge('w-28 h-28 rounded-full blur-3xl', className)}
		/>
	)
}
