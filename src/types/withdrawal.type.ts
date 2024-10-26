export interface IFeeResponse {
	fee?: string
}

interface IWithdrawRequest {
	userId: number
	address: string
}

export interface IWithdrawUsdtRequest extends IWithdrawRequest {
	amount: number
}

export interface IWithdrawTonRequest extends IWithdrawUsdtRequest {
	tag?: string
}

export interface IWithdrawNumberRequest extends IWithdrawRequest {
	number: string
}

export interface IWithdrawUsernameRequest extends IWithdrawRequest {
	username: string
}
