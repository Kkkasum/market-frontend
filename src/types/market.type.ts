import { INumberWithOwner } from './number.type'
import { IUsernameWithOwner } from './username.type'

export enum InstantSellAsset {
	NUMBER = 'NUMBER',
	USERNAME = 'USERNAME',
}

export interface IMarketAsset {
	price: number
	createdAt: string
}

export interface IMarketNumber extends IMarketAsset, INumberWithOwner {}

export interface IMarketUsername extends IMarketAsset, IUsernameWithOwner {}

export interface IMarketNumbersResponse {
	numbers: IMarketNumber[]
}

export interface IMarketUsernamesResponse {
	usernames: IMarketUsername[]
}

export interface IInstantSellPriceResponse {
	price: string
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

export interface IInstantSellUsernameRequest extends IBuyUsernameRequest {}
