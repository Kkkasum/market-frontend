import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

import useFee from '@/app/main/withdraw/hooks/useFee'
import useWithdrawTon from '@/app/main/withdraw/hooks/useWithdrawTon'
import Button from '@/components/ui/Button'
import Frame from '@/components/ui/Frame'
import Input from '@/components/ui/Input'
import { NETWORK } from '@/types/deposit.type'
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
	const { data, isLoading } = useFee(NETWORK.TON)
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
			className='flex flex-col gap-8 w-full'
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
					<span>Balance</span>
					<span>{tonBalance.toFixed(2)}</span>
				</p>

				<p className='flex items-center justify-between px-1'>
					<span>Withdrawal Fees</span>
					<span>{data?.fee} TON</span>
				</p>
			</div>

			<p className='flex flex-col w-full text-start text-lg text-red-500'>
				<span>{errors.address?.message}</span>
				<span>{errors.amount?.message}</span>
			</p>

			<div className='flex items-center justify-center fixed left-0 right-0 mx-auto bottom-0 w-full px-5 py-5 bg-[#1A2026] font-bold'>
				<Button
					className='w-full'
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
			</div>
		</form>
	)
}

export default TonForm
