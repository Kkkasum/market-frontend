export interface IFeeResponse {
	fee: number
}

interface IWithdrawRequest {
	userId: number
	address: string
}

export interface IWithdrawUsdtRequest extends IWithdrawRequest {
	amount: number
}

export interface IWithdrawTonRequest extends IWithdrawUsdtRequest {}

export interface IWithdrawNumberRequest extends IWithdrawRequest {
	number: string
}

export interface IWithdrawUsernameRequest extends IWithdrawRequest {
	username: string
}
