import { INumberWithOwner } from './number.type'
import { IUsernameWithOwner } from './username.type'

export interface IMarketAsset {
	price: number
	createdAt: string
}

export enum MarketAction {
	BUY = 'BUY',
	SELL = 'SELL',
}

export interface IMarketNumber extends IMarketAsset, INumberWithOwner {}

export interface IMarketUsername extends IMarketAsset, IUsernameWithOwner {}

export interface IFeeResponse {
	fee: number
}

export interface IMarketNumbersResponse {
	numbers: IMarketNumber[]
}

export interface IMarketUsernamesResponse {
	usernames: IMarketUsername[]
}

export interface IInstantSellNumberPriceResponse {
	price: number
}

export interface IAddMarketNumberRequest {
	userId: number
	numberId: number
	number: string
	price: number
}

export interface IAddMarketUsernameRequest {
	userId: number
	usernameId: number
	username: string
	price: number
}

export interface IBuyNumberRequest {
	userId: number
	number: string
}

export interface IBuyUsernameRequest {
	userId: number
	username: string
}

export interface IInstantSellNumberRequest extends IBuyNumberRequest {}
