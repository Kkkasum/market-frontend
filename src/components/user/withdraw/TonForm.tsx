import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

import useWithdrawTon from '@/app/main/user/hooks/withdraw/useWithdrawTon'
import Button from '@/components/ui/Button'
import Frame from '@/components/ui/Frame'
import Input from '@/components/ui/Input'
import { userId } from '@/utils/userId'
import { validTonAddress } from '@/utils/validAddress'

interface Props {
	tonBalance: number
}

interface IForm {
	address: string
	amount: number
}

const TonForm: FC<Props> = ({ tonBalance }) => {
	const { withdrawTon, isWithdrawPending } = useWithdrawTon(userId)
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<IForm>({ mode: 'onChange' })

	const onFormSubmit = ({ address, amount }: IForm) => {
		withdrawTon({
			userId: userId,
			address: address,
			amount: amount,
		})
	}

	return (
		<form
			className='flex flex-col gap-10 w-full'
			onSubmit={handleSubmit(onFormSubmit)}
		>
			<p className='flex flex-col items-start gap-1 w-full'>
				<span className='text-lg font-bold'>Enter address</span>

				<Input
					className={twMerge(
						'flex items-center justify-between p-3 bg-gray-blue w-full rounded-xl border border-solid',
						errors.address?.message
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
							(await validTonAddress(value)) ||
							'Invalid TON address',
					})}
				/>
			</p>

			<div className='flex flex-col gap-2 w-full'>
				<Frame
					className={twMerge(
						'pr-5 border border-solid',
						errors.amount?.message
							? 'border-red-600 bg-red-600/30'
							: 'border-transparent'
					)}
				>
					<Input
						className='text-4xl font-bold'
						type='amount'
						placeholder='TON'
						{...register<'amount'>('amount', {
							valueAsNumber: true,
							min: {
								value: 0.5,
								message: 'The minimum withdrawal amount is 0.5',
							},
							max: {
								value: tonBalance,
								message: 'Not enough balance',
							},
							validate: value =>
								value > 0 || 'Amount must be number',
						})}
					/>
				</Frame>

				<p className='flex items-center justify-between px-1'>
					<span>Balance:</span>
					<span>{tonBalance.toFixed(2)}</span>
				</p>
			</div>

			<p className='flex flex-col w-full text-start text-lg text-red-500'>
				<span>{errors.address?.message}</span>
				<span>{errors.amount?.message}</span>
			</p>

			<Button
				className='fixed bottom-10 w-[90vw]'
				disabled={
					!getValues('address') ||
					!getValues('amount') ||
					!!errors.address?.message ||
					!!errors.amount?.message
				}
				type='submit'
			>
				Withdraw
			</Button>
		</form>
	)
}

export default TonForm
