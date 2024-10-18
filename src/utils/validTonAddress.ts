import { Address } from '@ton/core'

export default async function validTonAddress(
	address: string
): Promise<boolean> {
	return Address.isFriendly(address) || Address.isRaw(address)
}
