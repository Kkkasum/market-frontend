export interface IDepositTokenTransaction {
	userId: number
	depositAddress: string
	amount: number
}

export interface IDepositAddressResponse {
	depositAddress: string
}

interface IDepositRequest {
	userId: number
}

export interface IDepositTokenRequest extends IDepositRequest {
	sender: string
	destination: string
	token: string
	amount: number
}

export interface IDepositNumberRequest extends IDepositRequest {
	number: string
}

export interface IDepositUsernameRequest extends IDepositRequest {
	username: string
}
