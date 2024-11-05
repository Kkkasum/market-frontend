import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

import useFee from '@/app/main/user/withdraw/hooks/useFee'
import useWithdrawNumber from '@/app/main/user/withdraw/hooks/useWithdrawNumber'
import NumbersDropdown from '@/components/dropdown/NumbersDropdown'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Loader from '@/components/ui/Loader'
import { NETWORK } from '@/types/deposit.type'
import { INumber } from '@/types/number.type'
import { validTonAddress } from '@/utils/validAddress'

interface Props {
	userId: number
	numbers: INumber[]
}

interface IForm {
	address: string
}

const NumberForm: FC<Props> = ({ userId, numbers }) => {
	const [number, setNumber] = useState<string>()
	const { data, isLoading } = useFee(NETWORK.TON)
	const { withdrawNumber, isWithdrawPending, isError } =
		useWithdrawNumber(userId)
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<IForm>({ mode: 'onChange' })

	const onFormSubmit = async ({ address }: IForm) => {
		if (number) {
			await withdrawNumber({
				userId: userId,
				address: address,
				number: number,
			})
		}
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

			<NumbersDropdown
				numbers={numbers}
				number={number}
				setNumber={setNumber}
			/>

			<p className='flex items-center justify-between px-1'>
				<span>Withdrawal Fees</span>
				<span>{data.fee} TON</span>
			</p>

			<p className='flex flex-col w-full text-start text-sm text-red-500'>
				<span>{errors.address?.message}</span>
			</p>

			<div className='flex items-center justify-center fixed left-0 right-0 mx-auto bottom-0 w-full px-5 py-5 bg-[#1A2026] font-bold'>
				<Button
					className='w-full'
					disabled={!number || !isValid || isError}
					type='submit'
				>
					{isError ? (
						"Something's went wrong. Try again later"
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

export default NumberForm
