interface IWithdrawalRequest {
	userId: number
	address: string
}

export interface IWithdrawalUsdtRequest extends IWithdrawalRequest {
	amount: number
}

export interface IWithdrawalTonRequest extends IWithdrawalUsdtRequest {}

export interface IWithdrawalNumberRequest extends IWithdrawalRequest {
	number: string
}

export interface IWithdrawalUsernameRequest extends IWithdrawalRequest {
	username: string
}
