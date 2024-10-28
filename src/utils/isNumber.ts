export default function isNumber(s: string): boolean {
	const re = new RegExp('888[0-9]{8}')

	return !!s.match(re)
}
