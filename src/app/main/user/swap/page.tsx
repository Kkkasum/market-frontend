'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

import SwapTokenDropdown from '@/components/dropdown/SwapTokenDropdown'
import SwapModal from '@/components/modals/SwapModal'
import Button from '@/components/ui/Button'
import Frame from '@/components/ui/Frame'
import SwapIcon from '@/components/ui/icons/user/SwapIcon'
import Input from '@/components/ui/Input'
import Loader from '@/components/ui/Loader'
import { userId } from '@/utils/userId'
import useAddSwap from '../hooks/swap/useAddSwap'
import useTokenRate from '../hooks/swap/useTokenRate'
import useUser from '../hooks/useUser'

interface IForm {
	fromAmount: number
}

export default function Page() {
	const [modalOpen, setModalOpen] = useState<boolean>(false)
	const [fromToken, setFromToken] = useState<string>('TON')
	const [toToken, setToToken] = useState<string>('USDT')
	const [toAmount, setToAmount] = useState<number>()

	const {
		register,
		handleSubmit,
		getValues,
		reset,
		formState: { errors, isValidating, isValid },
	} = useForm<IForm>({
		mode: 'onChange',
	})

	const tokenRate = useTokenRate(
		fromToken,
		toToken,
		!!getValues('fromAmount')
	)
	const user = useUser(userId)
	const { addUserSwap, resetUserSwap, isAddPending, isSwapSuccess } =
		useAddSwap(userId)

	let content: string
	switch (true) {
		case !getValues('fromAmount'):
			content = 'Enter amount'
			break
		case !isValid:
			content = 'Insufficient funds'
			break
		default:
			content = 'Swap'
			break
	}

	useEffect(() => {
		if (tokenRate.data && isValid) {
			setToAmount(+tokenRate.data.rate * getValues('fromAmount'))
		}
	}, [isValidating])

	useEffect(() => {
		if (!modalOpen) {
			setToAmount(0)
			reset()

			resetUserSwap()
		}
	}, [modalOpen])

	const switchTokens = (fromToken: string, toToken: string) => {
		setFromToken(toToken)
		setToToken(fromToken)

		reset()
		setToAmount(0)
	}

	const changeFromToken = (token: string, fromToken: string) => {
		reset()
		setToAmount(0)

		setFromToken(token)
		if (token === toToken) {
			setToToken(fromToken)
		}
	}

	const changeToToken = (token: string, toToken: string) => {
		reset()
		setToAmount(0)

		setToToken(token)
		if (token === fromToken) {
			setFromToken(toToken)
		}
	}

	const onFormSubmit = async (values: IForm) => {
		await addUserSwap({
			userId: userId,
			fromToken: fromToken,
			fromAmount: values.fromAmount,
			toToken: toToken,
		})
	}

	return user.isLoading ? (
		<Loader className='fixed bottom-0 left-0 w-full h-full' />
	) : user.data ? (
		<form onSubmit={handleSubmit(onFormSubmit)}>
			<div
				className={twMerge(
					'flex flex-col items-center justify-center gap-3 w-full z-0 relative',
					modalOpen && 'blurred'
				)}
			>
				<Frame className='text-4xl font-bold'>
					<Input
						className='bg-transparent w-3/4'
						placeholder='0'
						{...register<'fromAmount'>('fromAmount', {
							valueAsNumber: true,
							min: {
								value: 0.01,
								message: 'The minimum swap is 0.01',
							},
							max: {
								value:
									fromToken === 'TON'
										? user.data.tonBalance
										: user.data.usdtBalance,
								message: 'Not enough balance',
							},
							validate: value =>
								value > 0 || 'Amount must be number',
						})}
					/>

					<SwapTokenDropdown
						selectedToken={fromToken}
						changeToken={changeFromToken}
					/>
				</Frame>

				<div
					className='absolute top-[110px] right-3 z-10 rounded-full bg-gray-blue border border-solid border-white/10 p-3 cursor-pointer hover:bg-gray-blue transition-colors duration-300'
					onClick={() => switchTokens(fromToken, toToken)}
				>
					<SwapIcon />
				</div>

				<Frame className='text-4xl font-bold'>
					{!toAmount ? (
						<span className='opacity-60'>0</span>
					) : tokenRate.isLoading ? (
						<Loader />
					) : (
						<span className='text-start w-2/3'>
							{toAmount.toFixed(2)}
						</span>
					)}

					<SwapTokenDropdown
						selectedToken={toToken}
						changeToken={changeToToken}
					/>
				</Frame>

				{fromToken && (
					<p className='flex items-center justify-between px-3 w-full'>
						<span>Balance:</span>
						<span>
							{!!fromToken
								? (fromToken === 'TON'
										? user.data.tonBalance
										: user.data.usdtBalance
								  ).toFixed(2)
								: '-'}
						</span>
					</p>
				)}
			</div>

			<Button
				className={twMerge(
					'fixed bottom-10 w-[90vw]',
					modalOpen && 'blurred',
					!!errors.fromAmount?.message &&
						'border-red-600 bg-red-600/30'
				)}
				disabled={
					!getValues('fromAmount') || !!errors.fromAmount?.message
				}
				onClick={e => {
					e.preventDefault()
					setModalOpen(true)
				}}
			>
				{content}
			</Button>

			{tokenRate.data && toAmount ? (
				<SwapModal
					modalOpen={modalOpen}
					setModalOpen={setModalOpen}
					fromToken={fromToken}
					fromAmount={getValues('fromAmount')}
					toToken={toToken}
					toAmount={toAmount}
					tokenRate={tokenRate.data.rate}
					showLoader={isAddPending}
					isSuccess={isSwapSuccess}
				/>
			) : (
				<></>
			)}
		</form>
	) : (
		<span>Something's gone wrong. Try again later</span>
	)
}
