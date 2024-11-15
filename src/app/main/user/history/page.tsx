'use client'

import WebApp from '@twa-dev/sdk'
import { useEffect, useState } from 'react'

import FilterDropdown from '@/components/dropdown/FilterDropdown'
import TimeSortDropdown from '@/components/dropdown/TimeSortDropdown'
import DepositTable from '@/components/table/history/DepositTable'
import MarketOrderTable from '@/components/table/history/MarketOrderTable'
import NftDepositTable from '@/components/table/history/NftDepositTable'
import NftWithdrawalTable from '@/components/table/history/NftWIthdrawalTable'
import RubDepositTable from '@/components/table/history/RubDepositTable'
import SwapTable from '@/components/table/history/SwapTable'
import WithdrawalTable from '@/components/table/history/WithdrawalTable'
import Loader from '@/components/ui/Loader'
import useBackButton from '@/hooks/useBackButton'
import {
	IDepositTx,
	IMarketOrder,
	INftDepositTx,
	INftWithdrawalTx,
	IRubDepositTx,
	ISwapTx,
	IWithdrawalTx,
} from '@/types/history.type'
import { AssetFilter, NftTxFilter, TimeSort, TxFilter } from '@/types/user.type'
import { sortByTime } from '@/utils/sortByTime'
import useUserHistory from '../hooks/useUserHistory'

export default function Page() {
	let userId = 1
	if (typeof window !== 'undefined' && WebApp.initDataUnsafe.user?.id) {
		userId = WebApp.initDataUnsafe.user?.id
	}

	const { data, isLoading } = useUserHistory(userId)

	const [assetFilter, setAssetFilter] = useState<string>(AssetFilter.TOKEN)
	const [txFilter, setTxFilter] = useState<string>(TxFilter.DEPOSIT)
	const [nftTxFilter, setNftTxFilter] = useState<string>(NftTxFilter.DEPOSIT)
	const [timeSort, setTimeSort] = useState<TimeSort>(TimeSort.RECENTLY)

	useBackButton()

	useEffect(() => {
		if (assetFilter === AssetFilter.NFT && txFilter === TxFilter.SWAP) {
			setTxFilter(TxFilter.DEPOSIT)
		} else if (
			assetFilter === AssetFilter.RUB &&
			txFilter !== TxFilter.DEPOSIT
		) {
			setTxFilter(TxFilter.DEPOSIT)
		}
	}, [assetFilter])

	return (
		<>
			<div className='flex items-center gap-3'>
				<FilterDropdown
					currentFilter={assetFilter}
					filters={[
						AssetFilter.TOKEN,
						AssetFilter.RUB,
						AssetFilter.NFT,
					]}
					setFilter={setAssetFilter}
					align='start'
				/>

				{assetFilter === AssetFilter.TOKEN ? (
					<FilterDropdown
						currentFilter={txFilter}
						filters={[
							TxFilter.DEPOSIT,
							TxFilter.WITHDRAWAL,
							TxFilter.SWAP,
						]}
						setFilter={setTxFilter}
						align='center'
					/>
				) : assetFilter === AssetFilter.RUB ? (
					<FilterDropdown
						currentFilter={txFilter}
						filters={[TxFilter.DEPOSIT]}
						setFilter={setTxFilter}
						align='center'
					/>
				) : assetFilter === AssetFilter.NFT ? (
					<FilterDropdown
						currentFilter={nftTxFilter}
						filters={[
							NftTxFilter.DEPOSIT,
							NftTxFilter.WITHDRAWAL,
							NftTxFilter.MARKET,
						]}
						setFilter={setNftTxFilter}
					/>
				) : (
					<></>
				)}

				<TimeSortDropdown filter={timeSort} setFilter={setTimeSort} />
			</div>

			<div className='flex items-center justify-center border border-transparent rounded-xl overflow-hidden bg-gray-blue min-w-80 min-h-20'>
				{isLoading ? (
					<Loader />
				) : data ? (
					assetFilter === AssetFilter.TOKEN ? (
						txFilter === TxFilter.DEPOSIT ? (
							data.depositTxs ? (
								<DepositTable
									txs={sortByTime<IDepositTx>(
										data.depositTxs,
										timeSort
									)}
								/>
							) : (
								<span className='text-sm font-light opacity-40'>
									You have no deposits yet
								</span>
							)
						) : txFilter === TxFilter.WITHDRAWAL ? (
							data.withdrawalTxs ? (
								<WithdrawalTable
									txs={sortByTime<IWithdrawalTx>(
										data.withdrawalTxs,
										timeSort
									)}
								/>
							) : (
								<span className='text-sm font-light opacity-40'>
									You have no withdrawals yet
								</span>
							)
						) : data.swapTxs ? (
							<SwapTable
								txs={sortByTime<ISwapTx>(
									data.swapTxs,
									timeSort
								)}
							/>
						) : (
							<span className='text-sm font-light opacity-40'>
								You have no swaps yet
							</span>
						)
					) : assetFilter === AssetFilter.RUB ? (
						data.rubDepositTxs ? (
							<RubDepositTable
								txs={sortByTime<IRubDepositTx>(
									data.rubDepositTxs,
									timeSort
								)}
							/>
						) : (
							<span className='text-sm font-light opacity-40'>
								You have no RUB deposits yet
							</span>
						)
					) : assetFilter === AssetFilter.NFT ? (
						nftTxFilter === NftTxFilter.DEPOSIT ? (
							data.nftDepositTxs ? (
								<NftDepositTable
									txs={sortByTime<INftDepositTx>(
										data.nftDepositTxs,
										timeSort
									)}
								/>
							) : (
								<span className='text-sm font-light opacity-40'>
									You have no nft deposits yet
								</span>
							)
						) : nftTxFilter === NftTxFilter.WITHDRAWAL ? (
							data.nftWithdrawalTxs ? (
								<NftWithdrawalTable
									txs={sortByTime<INftWithdrawalTx>(
										data.nftWithdrawalTxs,
										timeSort
									)}
								/>
							) : (
								<span className='text-sm font-light opacity-40'>
									You have no nft withdrawals yet
								</span>
							)
						) : data.marketOrders ? (
							<MarketOrderTable
								orders={sortByTime<IMarketOrder>(
									data.marketOrders,
									timeSort
								)}
							/>
						) : (
							<span className='text-sm font-light opacity-40'>
								You have no buys or sells on market yet
							</span>
						)
					) : (
						<></>
					)
				) : (
					<span>Something's went wrong. Try again later</span>
				)}
			</div>
		</>
	)
}
