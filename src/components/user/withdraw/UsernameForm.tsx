import WebApp from '@twa-dev/sdk'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

import useWithdrawUsername from '@/app/main/withdraw/hooks/useWithdrawUsername'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { IUsername } from '@/types/username.type'
import { validTonAddress } from '@/utils/validAddress'
import UsernamesDropdown from '../../dropdown/UsernamesDropdown'

interface Props {
	usernames: IUsername[]
}

interface IForm {
	address: string
}

const UsernameForm: FC<Props> = ({ usernames }) => {
	const userId = WebApp.initDataUnsafe.user?.id || 1

	const [username, setUsername] = useState<string>()
	const { withdrawUsername, isWithdrawPending } = useWithdrawUsername(userId)
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<IForm>({ mode: 'onChange' })

	const onFormSubmit = ({ address }: IForm) => {
		if (username) {
			withdrawUsername({
				userId: userId,
				address: address,
				username: username,
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

			<UsernamesDropdown
				usernames={usernames}
				username={username}
				setUsername={setUsername}
			/>

			<p className='flex flex-col w-full text-start text-lg text-red-500'>
				<span>{errors.address?.message}</span>
			</p>

			<div className='flex items-center justify-center fixed left-0 right-0 mx-auto bottom-0 w-full px-5 py-5 bg-[#1A2026] font-bold'>
				<Button
					className='w-full'
					disabled={
						!username ||
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

export default UsernameForm
