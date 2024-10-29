import { MarketAction } from './market.type'

export interface ITx {
	id: number
	createdAt: string
}

export interface IDepositTx extends ITx {
	token: string
	amount: number
	txHash: string
}

export interface IWithdrawalTx extends IDepositTx {
	address: string
	txHash: string
}

export interface ISwapTx extends ITx {
	fromToken: string
	fromAmount: number
	toToken: string
	toAmount: number
	volume: number
}

export interface INftDepositTx extends ITx {
	nftName: string
	nftAddress: string
	txHash: string
}

export interface INftWithdrawalTx extends INftDepositTx {
	address: string
}

export interface IMarketOrder {
	id: number
	action: MarketAction
	nftName: string
	nftAddress: string
	price: string
	createdAt: string
}

export type TxType = IDepositTx | IWithdrawalTx | ISwapTx
