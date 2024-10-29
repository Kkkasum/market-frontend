import * as crypto from 'crypto'

export default function validateInitData(
	initData?: string,
	botToken?: string
): boolean {
	if (!initData || !botToken) {
		console.log('asd')
		return false
	}

	const urlSearchParams = new URLSearchParams(initData)
	const data = Object.fromEntries(urlSearchParams.entries())

	const checkString = Object.keys(data)
		.filter(key => key !== 'hash')
		.map(key => `${key}=${data[key]}`)
		.sort()
		.join('\n')

	const secretKey = crypto
		.createHmac('sha256', 'WebAppData')
		.update(botToken)
		.digest()

	const signature = crypto
		.createHmac('sha256', secretKey)
		.update(checkString)
		.digest('hex')

	console.log(data.hash, signature)

	return data.hash === signature
}
