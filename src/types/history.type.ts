export enum TxKind {
	DEPOSIT = 'DEPOSIT',
	WITHDRAW = 'WITHDRAW',
	SWAP = 'SWAP',
}

export interface ITx {
	id: number
	createdAt: string
}

export interface IDepositTx extends ITx {
	token: string
	amount: number
	// hash: string
}

export interface IWithdrawalTx extends IDepositTx {
	address: string
	// hash: string
}

export interface ISwapTx extends ITx {
	fromToken: string
	fromAmount: number
	toToken: string
	toAmount: number
	volume: number
}

export type TxType = IDepositTx | IWithdrawalTx | ISwapTx
