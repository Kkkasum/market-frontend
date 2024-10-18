import { FC, HTMLProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends HTMLProps<HTMLButtonElement> {}

const Button: FC<Props> = ({
	className,
	disabled,
	onClick,
	children,
}: Props) => {
	return (
		<button
			className={twMerge(
				'flex items-center justify-center py-3 bg-blue rounded-xl transition-opacity duration-300',
				disabled ? 'opacity-40' : 'cursor-pointer',
				className
			)}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	)
}

export default Button
