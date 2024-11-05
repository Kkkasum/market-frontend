import { FC, useEffect, useState } from 'react'
import QRCode from 'react-qr-code'

import useDepositAddress from '@/app/main/user/deposit/hooks/useDepositAddress'
import Button from '@/components/ui/Button'
import CheckIcon from '@/components/ui/icons/CheckIcon'
import CopyIcon from '@/components/ui/icons/CopyIcon'
import ShowIcon from '@/components/ui/icons/ShowIcon'
import WarningIcon from '@/components/ui/icons/WarningIcon'
import Loader from '@/components/ui/Loader'
import { NETWORK } from '@/types/deposit.type'

interface Props {
	userId: number
}

const TronDeposit: FC<Props> = ({ userId }) => {
	const [isCopied, setIsCopied] = useState<boolean>(false)

	const { data, isLoading } = useDepositAddress(NETWORK.TRON, userId)

	const handleCopy = () => {
		if (data?.depositAddress) {
			navigator.clipboard.writeText(data.depositAddress)
			setIsCopied(true)
		}
	}

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsCopied(false)
		}, 1500)

		return () => clearTimeout(timeout)
	}, [isCopied])

	return isLoading ? (
		<Loader />
	) : data ? (
		<div className='flex flex-col items-center gap-3 mb-32'>
			<div className='flex flex-col items-center gap-3 bg-gray-blue rounded-2xl p-2'>
				<div className='bg-white rounded-2xl p-3'>
					<QRCode
						size={200}
						value={data.depositAddress}
						fgColor='#293440'
					/>
				</div>

				<span className='flex items-center gap-1 text-gray-text'>
					Send only <b>USDT</b> in network <b>TRON</b>
				</span>
			</div>

			<p className='flex flex-col items-start gap-0.5 break-all w-full'>
				<span className='opacity-40'>Deposit Address</span>
				<span>{data.depositAddress}</span>
			</p>

			<p className='flex items-center justify-center gap-1 bg-orange-400/10 rounded-xl p-3 w-full text-sm'>
				<WarningIcon />
				<span>Minimun deposit amount: 10 USDT</span>
			</p>

			<div className='flex items-center justify-center fixed bottom-0 w-full px-5 py-5 bg-[#1A2026] gap-5 font-bold'>
				<a
					href={`https://oklink.com/trx/address/${data.depositAddress}`}
					target='_blank'
					className='w-1/2'
				>
					<Button className='flex items-center gap-1 w-full'>
						<ShowIcon />
						<span>Show</span>
					</Button>
				</a>

				<Button
					className='flex items-center gap-1 w-1/2 h-12'
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
}

export default TronDeposit
