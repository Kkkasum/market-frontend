'use client'

import WebApp from '@twa-dev/sdk'
import { motion } from 'framer-motion'
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
import useBackButton from '@/hooks/useBackButton'
import { ROUTE_USER } from '@/routes'
import useUser from '../hooks/useUser'
import useAddSwap from './hooks/useAddSwap'
import useIsSwapAvailable from './hooks/useIsSwapAvailable'
import useTokenRate from './hooks/useTokenRate'

interface IForm {
	fromAmount: number
}

export default function Page() {
	let userId = 1
	if (typeof window !== 'undefined') {
		userId = WebApp.initDataUnsafe.user?.id || 1
	}

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

	const isSwapAvailable = useIsSwapAvailable()
	const user = useUser(userId)
	const tokenRate = useTokenRate(
		fromToken,
		toToken,
		!!getValues('fromAmount')
	)
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

	useBackButton(ROUTE_USER)

	useEffect(() => {
		if (tokenRate.data && isValid) {
			setToAmount(+tokenRate.data.rate * getValues('fromAmount'))
		}
	}, [isValidating])

	useEffect(() => {
		if (!modalOpen) {
			reset()
			setToAmount(0)

			resetUserSwap()
		}
	}, [modalOpen])

	const switchTokens = (fromToken: string, toToken: string) => {
		reset()
		setToAmount(0)

		setFromToken(toToken)
		setToToken(fromToken)
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

	return isSwapAvailable.isLoading ? (
		<Loader className='fixed bottom-0 left-0 w-full h-full' />
	) : isSwapAvailable.isError ? (
		<span className='flex items-center justify-center fixed bottom-0 left-0 w-full h-full'>
			Service is unavailable. Try again later
		</span>
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
					className='flex items-center justify-center absolute top-0 bottom-0 right-3 my-auto h-12 z-10 rounded-full bg-gray-blue border border-solid border-white/10 p-3 cursor-pointer'
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
			</div>

			<div className='flex flex-col items-center gap-3 mt-3'>
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

				{tokenRate.data?.rate && (
					<motion.span
						initial={{ opacity: 0.5 }}
						animate={{ opacity: 1 }}
						className='flex justify-center px-auto py-3 bg-dark-gray rounded-xl w-full'
					>{`1 ${fromToken} ~ ${(+tokenRate.data.rate).toFixed(
						4
					)} ${toToken}`}</motion.span>
				)}
			</div>

			<div className='flex items-center justify-center fixed left-0 right-0 mx-auto bottom-0 w-full px-5 py-5 bg-[#1A2026] font-bold'>
				<Button
					className={twMerge(
						'w-full',
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
			</div>

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
