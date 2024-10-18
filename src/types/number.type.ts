import { IMarketNumber } from './market.type'

export enum NumberStatus {
	WALLET = 'Wallet',
	MARKET = 'Market',
}

export interface INumber {
	id: number
	number: string
	address: string
	status: NumberStatus
}

export interface INumberWithOwner extends INumber {
	ownerId: number
}

export interface INumberResponse extends IMarketNumber {}

export interface INumberByAddressResponse {
	number: string
}
