import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

import useDepositRequisite from '@/app/main/user/deposit/hooks/useDepositRequisite'
import PaymentTypeDropdown from '@/components/dropdown/PaymentTypeDropdown'
import Button from '@/components/ui/Button'
import Frame from '@/components/ui/Frame'
import CheckIcon from '@/components/ui/icons/CheckIcon'
import CopyIcon from '@/components/ui/icons/CopyIcon'
import Input from '@/components/ui/Input'
import Loader from '@/components/ui/Loader'
import Warning from '@/components/ui/Warning'
import { PaymentType } from '@/types/deposit.type'

interface Props {
	userId: number
}

interface IForm {
	amount: number
}

const RubDeposit: FC<Props> = ({ userId }) => {
	const [amount, setAmount] = useState<number>(0)
	const [paymentType, setPaymentType] = useState<PaymentType>()
	const [isCopied, setIsCopied] = useState<boolean>(false)
	const [isEnabled, setIsEnabled] = useState<boolean>(false)

	const { data, isLoading } = useDepositRequisite(
		userId,
		amount,
		paymentType?.toUpperCase(),
		isEnabled
	)

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<IForm>({ mode: 'onChange' })

	const onFormSubmit = ({ amount }: IForm) => {
		setAmount(amount)
		setIsEnabled(true)
	}

	const handleCopy = () => {
		if (data?.requisite) {
			navigator.clipboard.writeText(data.requisite.replaceAll(' ', ''))
			setIsCopied(true)
		}
	}

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsCopied(false)
		}, 1500)

		return () => clearTimeout(timeout)
	}, [isCopied])

	return isEnabled ? (
		isLoading ? (
			<Loader className='fixed bottom-0 left-0 w-full h-full' />
		) : data ? (
			<div className='flex flex-col gap-2'>
				<p className='flex items-center justify-between'>
					<span>Requisite</span>
					<span>{data.requisite}</span>
				</p>

				<p className='flex items-center justify-between'>
					<span>Receiver</span>
					<span>{data.owner}</span>
				</p>

				<p className='flex items-center justify-between'>
					<span>Bank</span>
					<span>{data.bank}</span>
				</p>

				<p className='flex items-center justify-between'>
					<span>Deposit Fees</span>
					<span>{data.fee}%</span>
				</p>

				<div className='flex items-center justify-center fixed bottom-0 left-0 right-0 w-full px-5 py-5 bg-[#1A2026] gap-5 font-bold'>
					<Button
						className='flex items-center gap-1 w-full h-12'
						onClick={handleCopy}
						disabled={isCopied}
					>
						{isCopied ? (
							<>
								<CheckIcon />
								<span>Copied</span>
							</>
						) : (
							<>
								<CopyIcon />
								<span>Copy</span>
							</>
						)}
					</Button>
				</div>
			</div>
		) : (
			<span>Something's went wrong. Try again later</span>
		)
	) : (
		<form
			className='flex flex-col gap-5'
			onSubmit={handleSubmit(onFormSubmit)}
		>
			<div className='flex flex-col items-start gap-1 w-full'>
				<span className='text-lg font-bold'>Choose payment type</span>

				<PaymentTypeDropdown
					paymentType={paymentType}
					setPaymentType={setPaymentType}
				/>
			</div>

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
					placeholder='RUB'
					{...register<'amount'>('amount', {
						valueAsNumber: true,
						min: {
							value: 1000,
							message: 'Minimum withdrawal amount is 1000',
						},
						validate: value =>
							Number.isInteger(value) ||
							'Amount must be integer number',
					})}
				/>
			</Frame>

			<Warning text='Amount must be integer' />

			<Warning text="If deposit's succeed, RUB will be converted to USDT" />

			<p className='flex flex-col w-full text-start text-sm text-red-500'>
				<span>{errors.amount?.message}</span>
			</p>

			<div className='flex items-center justify-center fixed left-0 right-0 mx-auto bottom-0 w-full px-5 py-5 bg-[#1A2026] font-bold'>
				<Button
					className='w-full'
					disabled={!isValid || !paymentType}
					type='submit'
				>
					Get requisite
				</Button>
			</div>
		</form>
	)
}

export default RubDeposit
