'use client'

import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import TimeSortDropdown from '@/components/dropdown/TimeFilterDropdown'
import TxFilterDropdown from '@/components/dropdown/TxFilterDropdown'
import DepositTxModal from '@/components/modals/history/DepositTxModal'
import SwapTxModal from '@/components/modals/history/SwapTxModal'
import WithdrawalTxModal from '@/components/modals/history/WithdrawalTxModal'
import DepositTable from '@/components/table/history/DepositTable'
import SwapTable from '@/components/table/history/SwapTable'
import WithdrawalTable from '@/components/table/history/WithdrawalTable'
import Loader from '@/components/ui/Loader'
import { IDepositTx, ISwapTx, IWithdrawalTx } from '@/types/history.type'
import { TimeSort, TxFilter } from '@/types/user.type'
import { sortByTime } from '@/utils/sortByTime'
import { userId } from '@/utils/userId'
import useUserHistory from '../hooks/useUserHistory'

export default function Page() {
	const { data, isLoading } = useUserHistory(userId)

	const [txFilter, setTxFilter] = useState<TxFilter>(TxFilter.DEPOSIT)
	const [timeSort, setTimeSort] = useState<TimeSort>(TimeSort.RECENTLY)

	const [modalOpen, setModalOpen] = useState<boolean>(false)
	const [depositTx, setDepositTx] = useState<IDepositTx>()
	const [withdrawalTx, setWithdrawalTx] = useState<IWithdrawalTx>()
	const [swapTx, setSwapTx] = useState<ISwapTx>()

	const showDepositTxModal = (tx: IDepositTx) => {
		setModalOpen(true)
		setDepositTx(tx)
	}

	const showWithdrawalTxModal = (tx: IWithdrawalTx) => {
		setModalOpen(true)
		setWithdrawalTx(tx)
	}

	const showSwapTxModal = (tx: ISwapTx) => {
		setModalOpen(true)
		setSwapTx(tx)
	}

	return (
		<>
			<div
				className={twMerge(
					'flex flex-col gap-3',
					modalOpen && 'blurred'
				)}
			>
				<div className='flex items-center justify-between text-start text-sm'>
					<span className='text-2xl font-bold'>History</span>

					<div className='flex items-center gap-3'>
						<TxFilterDropdown
							filter={txFilter}
							setFilter={setTxFilter}
						/>

						<TimeSortDropdown
							filter={timeSort}
							setFilter={setTimeSort}
						/>
					</div>
				</div>

				{isLoading ? (
					<Loader />
				) : txFilter === TxFilter.DEPOSIT ? (
					<div className='flex items-center justify-center border border-transparent rounded-xl overflow-hidden bg-gray-blue min-w-80 min-h-20'>
						{data?.depositTxs ? (
							<DepositTable
								txs={sortByTime<IDepositTx>(
									data.depositTxs,
									timeSort
								)}
								showTxModal={showDepositTxModal}
							/>
						) : (
							<span className='text-sm font-light opacity-40'>
								You have no deposits yet
							</span>
						)}
					</div>
				) : txFilter === TxFilter.WITHDRAWAL ? (
					<div className='flex items-center justify-center border border-transparent rounded-xl overflow-hidden bg-gray-blue min-w-80 min-h-20'>
						{data?.withdrawalTxs ? (
							<WithdrawalTable
								txs={sortByTime<IWithdrawalTx>(
									data.withdrawalTxs,
									timeSort
								)}
								showTxModal={showWithdrawalTxModal}
							/>
						) : (
							<span className='text-sm font-light opacity-40'>
								You have no withdrawals yet
							</span>
						)}
					</div>
				) : (
					<div className='flex items-center justify-center border border-transparent rounded-xl overflow-hidden bg-gray-blue min-w-80 min-h-20'>
						{data?.swapTxs ? (
							<SwapTable
								txs={sortByTime<ISwapTx>(
									data.swapTxs,
									timeSort
								)}
								showTxModal={showSwapTxModal}
							/>
						) : (
							<span className='text-sm font-light opacity-40'>
								You have no swaps yet
							</span>
						)}
					</div>
				)}
			</div>

			{txFilter === TxFilter.DEPOSIT && depositTx ? (
				<DepositTxModal
					modalOpen={modalOpen}
					setModalOpen={setModalOpen}
					tx={depositTx}
				/>
			) : txFilter === TxFilter.WITHDRAWAL && withdrawalTx ? (
				<WithdrawalTxModal
					modalOpen={modalOpen}
					setModalOpen={setModalOpen}
					tx={withdrawalTx}
				/>
			) : txFilter === TxFilter.SWAP && swapTx ? (
				<SwapTxModal
					modalOpen={modalOpen}
					setModalOpen={setModalOpen}
					tx={swapTx}
				/>
			) : (
				<></>
			)}
		</>
	)
}
