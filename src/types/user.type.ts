import {
	IDepositTx,
	IMarketOrder,
	INftDepositTx,
	INftWithdrawalTx,
	ISwapTx,
	IWithdrawalTx,
} from './history.type'
import { INumber } from './number.type'
import { IUsername } from './username.type'

export enum AssetFilter {
	TOKEN = 'Token',
	NFT = 'NFT',
}

export enum TxFilter {
	DEPOSIT = 'Deposit',
	WITHDRAWAL = 'Withdrawal',
	SWAP = 'Swap',
}

export enum NftTxFilter {
	DEPOSIT = 'Deposit',
	WITHDRAWAL = 'Withdrawal',
	MARKET = 'Market',
}

export enum TimeSort {
	RECENTLY = 'Recently',
	OLDEST = 'Oldest',
}

export enum Asset {
	TON = 'TON',
	USDT = 'USDT',
	RUB = 'RUB',
	NUMBER = 'Number',
	USERNAME = 'Username',
}

export interface IUserWallet {
	tonBalance: number
	tonUsdBalance: number
	usdtBalance: number
}

export interface IUser extends IUserWallet {
	numbers?: INumber[]
	usernames?: IUsername[]
}

export interface IUserResponse extends IUser {}

export interface IUserWalletResponse extends IUserWallet {}

export interface IUserHistoryResponse {
	depositTxs?: IDepositTx[]
	withdrawalTxs?: IWithdrawalTx[]
	swapTxs?: ISwapTx[]
	nftDepositTxs?: INftDepositTx[]
	nftWithdrawalTxs?: INftWithdrawalTx[]
	marketOrders?: IMarketOrder[]
}

export interface IAddUserRequest {
	userId: number
}
