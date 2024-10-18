import {
	useIsConnectionRestored,
	useTonConnectUI,
	useTonWallet,
} from '@tonconnect/ui-react'
import { useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

import Button from '@/components/ui/Button'
import Frame from '@/components/ui/Frame'
import Input from '@/components/ui/Input'
import DepositService from '@/services/deposit.service'
import { userId } from '@/utils/userId'

interface Props {
	token: string
	depositAddress: string
}

interface IForm {
	amount: number
}

export default function TokenDep({ token, depositAddress }: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<IForm>({ mode: 'onChange' })

	const [tonconnectUI] = useTonConnectUI()
	const wallet = useTonWallet()
	const isConnectionRestored = useIsConnectionRestored()

	let content: string
	switch (true) {
		case !isConnectionRestored:
			content = 'Loading...'
			break
		case !!wallet:
			content = 'Deposit'
			break
		default:
		case !wallet:
			content = 'Connect wallet'
			break
	}

	const onFormSubmit = async ({ amount }: IForm) => {
		if (!wallet) {
			tonconnectUI.openModal().catch(e => console.log(e))
		} else {
			tonconnectUI
				.sendTransaction(
					DepositService.createDepositTokenTransaction({
						userId: userId,
						depositAddress: depositAddress,
						amount: amount,
					}),
					{
						modals: ['before', 'success', 'error'],
						notifications: ['before', 'success', 'error'],
					}
				)
				.catch(e => console.log(e))
				.then(() =>
					DepositService.depositToken({
						userId: userId,
						sender: wallet.account.address,
						destination: depositAddress,
						token: token,
						amount: amount,
					})
				)
		}
	}

	return (
		<form
			className='flex flex-col items-start gap-3 w-full'
			onSubmit={handleSubmit(onFormSubmit)}
		>
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
					placeholder={token}
					{...register<'amount'>('amount', {
						valueAsNumber: true,
						min: {
							value: 0.1,
							message: 'The minimum deposit amount is 0.1',
						},
						validate: value => value > 0 || 'Amount must be number',
					})}
				/>
			</Frame>

			<span>Connect ton wallet</span>

			<p className='flex flex-col w-full text-start text-lg text-red-500'>
				<span>{errors.amount?.message}</span>
			</p>

			<Button
				className='fixed bottom-10 w-[90vw]'
				disabled={!isValid}
				type='submit'
			>
				{content}
			</Button>
		</form>
	)
}
