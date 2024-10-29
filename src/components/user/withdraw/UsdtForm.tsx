import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

import useFee from '@/app/main/user/withdraw/hooks/useFee'
import useWithdrawUsdt from '@/app/main/user/withdraw/hooks/useWithdrawUsdt'
import Button from '@/components/ui/Button'
import Frame from '@/components/ui/Frame'
import Input from '@/components/ui/Input'
import Loader from '@/components/ui/Loader'
import { NETWORK } from '@/types/deposit.type'
import { validUsdtAddress } from '@/utils/validAddress'

interface Props {
	userId: number
	usdtBalance: number
}

interface IForm {
	address: string
	amount: number
}

const UsdtForm: FC<Props> = ({ userId, usdtBalance }) => {
	const { data, isLoading } = useFee(NETWORK.TRON)
	const { withdrawUsdt, isWithdrawPending, isError } = useWithdrawUsdt(userId)
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<IForm>({ mode: 'onChange' })

	const onFormSubmit = ({ address, amount }: IForm) => {
		withdrawUsdt({
			userId: userId,
			address: address,
			amount: amount,
		})
	}

	return isLoading ? (
		<Loader />
	) : data?.fee ? (
		<form
			className='flex flex-col gap-5 w-full'
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
							message: 'Invalid TRON address',
						},
						maxLength: {
							value: 66,
							message: 'Invalid TRON address',
						},
						validate: value =>
							validUsdtAddress(value) || 'Invalid TRON address',
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
						className={'text-4xl font-bold'}
						type='amount'
						placeholder='USDT'
						{...register<'amount'>('amount', {
							valueAsNumber: true,
							min: {
								value: 10,
								message: 'The minimum withdrawal amount is 10',
							},
							max: {
								value: usdtBalance,
								message: 'Not enough balance',
							},
							validate: value =>
								value > 0 || 'Amount must be number',
						})}
					/>
				</Frame>

				<p className='flex items-center justify-between px-1'>
					<span>Balance</span>
					<span>{usdtBalance.toFixed(2)}</span>
				</p>

				<p className='flex items-center justify-between px-1'>
					<span>Withdrawal Fees</span>
					<span>{data.fee} USDT</span>
				</p>
			</div>

			<p className='flex flex-col w-full text-start text-sm text-red-500'>
				<span>{errors.address?.message}</span>
				<span>{errors.amount?.message}</span>
			</p>

			<div className='flex items-center justify-center fixed left-0 right-0 mx-auto bottom-0 w-full px-5 py-5 bg-[#1A2026] font-bold'>
				<Button
					className='w-full'
					disabled={
						isLoading || isWithdrawPending || !isValid || isError
					}
					type='submit'
				>
					{isError ? (
						'Some error occurred'
					) : isWithdrawPending ? (
						<Loader size={24} />
					) : (
						'Withdraw'
					)}
				</Button>
			</div>
		</form>
	) : (
		<span>Something's went wrong. Try again later</span>
	)
}

export default UsdtForm
