interface IWithdrawRequest {
	userId: number
	address: string
}

export interface IWithdrawTokenRequest extends IWithdrawRequest {
	token: string
	amount: number
}

export interface IWithdrawNumberRequest extends IWithdrawRequest {
	number: string
}

export interface IWithdrawUsernameRequest extends IWithdrawRequest {
	username: string
}
