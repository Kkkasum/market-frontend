import { Address } from '@ton/core'

export function validUsdtAddress(address: string): boolean {
	const re = RegExp('T[A-Za-z1-9]{33}')

	return !!address.matchAll(re)
}

export async function validTonAddress(address: string): Promise<boolean> {
	return Address.isFriendly(address) || Address.isRaw(address)
}
