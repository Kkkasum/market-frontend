export enum NETWORK {
	TRON = 'TRON',
	TON = 'TON',
}

export enum PaymentType {
	CARD = 'Card',
	SPB = 'SPB',
}

export interface IRequisite {
	requisite: string
	owner: string
	bank: string
}

export interface IDepositAddressResponse {
	depositAddress: string
}

export interface IRequisiteResponse extends IRequisite {
	fee: string
}
