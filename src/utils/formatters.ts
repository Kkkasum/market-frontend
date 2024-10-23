export function formatNumber(number: string): string {
	return `+${number.slice(0, 3)} ${number.slice(3, 7)} ${number.slice(7, 11)}`
}

export function formatAddress(address: string): string {
	return `${address.slice(0, 4)}...${address.slice(-4)}`
}

export function formatDate(date: Date): string {
	const hrs = date.getHours()
	const mins = date.getMinutes()
	const day = date.getDate()
	const month = date.getMonth() + 1

	return `${hrs < 10 ? '0' + hrs : hrs}:${mins < 10 ? '0' + mins : mins} ${
		day < 10 ? '0' + day : day
	}/${month < 10 ? '0' + month : month}/${date.getFullYear()}`
}

export function formatTxHash(hash: string): string {
	return `${hash.slice(0, 5)}...${hash.slice(-5)}`
}
