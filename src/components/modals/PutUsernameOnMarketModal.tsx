import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

import useAddUsername from '@/app/main/username/hooks/useAddUsername'
import Button from '../ui/Button'
import TonIcon from '../ui/icons/TonIcon'
import Input from '../ui/Input'
import Modal from '../ui/Modal'

interface Props {
	modalOpen: boolean
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
	usernameId: number
	username: string
}

interface IForm {
	price: number
}

const PutUsernameOnMarketModal: FC<Props> = ({
	modalOpen,
	setModalOpen,
	usernameId,
	username,
}) => {
	const userId = 6640542382 // fix

	const { addUsername, isAddPending } = useAddUsername(userId, username)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IForm>({ mode: 'onChange' })

	const onFormSubmit = async ({ price }: IForm) => {
		await addUsername({
			userId: userId,
			usernameId: usernameId,
			username: username,
			price: price,
		})
	}

	useEffect(() => {
		if (!modalOpen) {
			reset()
		}
	}, [modalOpen])

	return (
		<Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
			<form onSubmit={handleSubmit(onFormSubmit)}>
				<div className='flex flex-col gap-3 my-5'>
					<span className='flex items-center justify-center text-3xl font-bold'>
						@{username}
					</span>

					<div className='flex flex-col items-start justify-between text-start text-lg font-medium'>
						<span>Price</span>

						<p
							className={twMerge(
								'flex items-center gap-5 px-5 py-3 w-full rounded-xl border border-solid',
								errors.price?.message
									? 'border-red-600 bg-red-600/30'
									: 'border-transparent bg-dark'
							)}
						>
							<TonIcon width={16} height={16} color='#4EB2FF' />

							<Input
								{...register<'price'>('price', {
									valueAsNumber: true,
									validate: value =>
										value > 0 || 'Price must be username',
								})}
							/>
						</p>
					</div>
				</div>

				<Button
					type='submit'
					className='w-full font-bold'
					disabled={false}
				>
					Confirm
				</Button>
			</form>
		</Modal>
	)
}

export default PutUsernameOnMarketModal
