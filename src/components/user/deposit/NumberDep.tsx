import { useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

import useNumberByAddress from '@/app/main/number/hooks/useNumberByAddress'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Loader from '@/components/ui/Loader'
import { formatNumber } from '@/utils/formatters'
import validTonAddress from '@/utils/validTonAddress'

interface IForm {
	address: string
}

export default function NumberDep() {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors, isValid },
	} = useForm<IForm>({ mode: 'onBlur' })

	const { data, isLoading, isError } = useNumberByAddress(
		getValues('address'),
		isValid
	)

	const onFormSubmit = ({ address }: IForm) => {}

	return (
		<form
			className='flex flex-col items-start gap-3 w-full'
			onSubmit={handleSubmit(onFormSubmit)}
		>
			<span className='text-lg font-bold'>Enter NFT address</span>

			<Input
				className={twMerge(
					'flex items-center justify-between p-3 bg-gray-blue w-full rounded-xl border border-solid',
					errors.address?.message || isError
						? 'border-red-600 bg-red-600/30'
						: 'border-transparent'
				)}
				placeholder='Address'
				{...register<'address'>('address', {
					required: 'Address is required',
					minLength: {
						value: 48,
						message: 'Invalid TON address',
					},
					maxLength: {
						value: 66,
						message: 'Invalid TON address',
					},
					validate: async value =>
						(await validTonAddress(value)) || 'Invalid TON address',
				})}
			/>

			<div className='flex flex-col w-full text-start text-lg'>
				<span className='text-red-500'>{errors.address?.message}</span>
				{isLoading ? (
					<Loader />
				) : isError ? (
					<span className='text-red-500'>Invalid number address</span>
				) : (
					data && (
						<p className='flex items-center justify-between'>
							<span>Number:</span>
							<span>{formatNumber(data.number)}</span>
						</p>
					)
				)}
			</div>

			<Button
				className='fixed bottom-10 w-[90vw]'
				disabled={!isValid || isLoading || isError}
				type='submit'
			>
				Deposit
			</Button>
		</form>
	)
}
