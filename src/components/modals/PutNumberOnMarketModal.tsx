import WebApp from '@twa-dev/sdk'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

import useMarketFee from '@/app/main/market/hooks/useMarketFee'
import useAddNumber from '@/app/main/number/hooks/useAddNumber'
import { MarketAction } from '@/types/market.type'
import { formatNumber } from '@/utils/formatters'
import Button from '../ui/Button'
import TonIcon from '../ui/icons/TonIcon'
import Input from '../ui/Input'
import Loader from '../ui/Loader'
import Modal from '../ui/Modal'

interface Props {
	modalOpen: boolean
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
	numberId: number
	number: string
}

interface IForm {
	price: number
}

const PutNumberOnMarketModal: FC<Props> = ({
	modalOpen,
	setModalOpen,
	numberId,
	number,
}) => {
	let userId = 1
	if (typeof window !== 'undefined' && WebApp.initDataUnsafe.user?.id) {
		userId = WebApp.initDataUnsafe.user?.id
	}

	const { data, isLoading } = useMarketFee(MarketAction.SELL)
	const { addNumber, isAddPending } = useAddNumber(userId, number)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IForm>({ mode: 'onChange' })

	const onFormSubmit = async ({ price }: IForm) => {
		await addNumber({
			userId: userId,
			numberId: numberId,
			number: number,
			price: price,
		})
	}

	return (
		<Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
			{isLoading ? (
				<Loader />
			) : data ? (
				<form onSubmit={handleSubmit(onFormSubmit)}>
					<div className='flex flex-col gap-3 my-5'>
						<span className='flex items-center justify-center text-3xl font-bold'>
							{formatNumber(number)}
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
								<TonIcon
									width={16}
									height={16}
									color='#4EB2FF'
								/>

								<Input
									{...register<'price'>('price', {
										valueAsNumber: true,
										validate: value =>
											value > 0 || 'Price must be number',
									})}
								/>
							</p>
						</div>

						<p className='flex items-center justify-between'>
							<span>Sell Fees</span>
							<span>{data.fee}%</span>
						</p>
					</div>

					<Button
						type='submit'
						className='w-full font-bold'
						disabled={isAddPending}
					>
						{isAddPending ? <Loader size={24} /> : 'Confirm'}
					</Button>
				</form>
			) : (
				<span>Something's went wrong. Try again later</span>
			)}
		</Modal>
	)
}

export default PutNumberOnMarketModal
