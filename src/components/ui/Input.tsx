import { forwardRef, HTMLProps, Ref } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends HTMLProps<HTMLInputElement> {
	className?: string
}

const Input = forwardRef(
	({ className, ...inputProps }: Props, ref: Ref<HTMLInputElement>) => {
		return (
			<input
				className={twMerge(
					'outline-none no-arrows w-full bg-transparent',
					className
				)}
				{...inputProps}
				autoComplete='off'
				spellCheck='false'
				ref={ref}
			/>
		)
	}
)

export default Input
