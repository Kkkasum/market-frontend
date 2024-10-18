import { IMarketUsername } from './market.type'

export enum UsernameStatus {
	WALLET = 'Wallet',
	MARKET = 'Market',
}

export interface IUsername {
	id: number
	username: string
	address: string
	status: UsernameStatus
}

export interface IUsernameWithOwner extends IUsername {
	ownerId: number
}

export interface IUsernameResponse extends IMarketUsername {}

export interface IUsernameByAddressResponse {
	username: string
}
