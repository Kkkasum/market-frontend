import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

import useWithdrawNumber from '@/app/main/withdraw/hooks/useWithdrawNumber'
import NumbersDropdown from '@/components/dropdown/NumbersDropdown'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { INumber } from '@/types/number.type'
import { userId } from '@/utils/userId'
import { validTonAddress } from '@/utils/validAddress'

interface Props {
	numbers: INumber[]
}

interface IForm {
	address: string
}

const NumberForm: FC<Props> = ({ numbers }) => {
	const [number, setNumber] = useState<string>()
	const { withdrawNumber, isWithdrawPending } = useWithdrawNumber(userId)
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<IForm>({ mode: 'onChange' })

	const onFormSubmit = ({ address }: IForm) => {
		if (number) {
			withdrawNumber({
				userId: userId,
				address: address,
				number: number,
			})
		}
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

			<NumbersDropdown
				numbers={numbers}
				number={number}
				setNumber={setNumber}
			/>

			<p className='flex flex-col w-full text-start text-lg text-red-500'>
				<span>{errors.address?.message}</span>
			</p>

			<div className='flex items-center justify-center fixed left-0 right-0 mx-auto bottom-0 w-full px-5 py-5 bg-[#1A2026] font-bold'>
				<Button
					className='w-full'
					disabled={
						!number ||
						!getValues('address') ||
						!!errors.address?.message
					}
					type='submit'
				>
					Withdraw
				</Button>
			</div>
		</form>
	)
}

export default NumberForm
