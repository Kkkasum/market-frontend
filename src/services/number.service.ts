import { axiosBase } from '@/api/interceptors'
import { INumberByAddressResponse, INumberResponse } from '@/types/number.type'

const NumberService = {
	async getNumber(number: string) {
		const response = await axiosBase.get<INumberResponse>(
			`/number/${number}`
		)
		return response.data
	},

	async getNumberByAddress(address: string) {
		const response = await axiosBase.get<INumberByAddressResponse>(
			`/number/contract/${address}`
		)
		return response.data
	},
}

export default NumberService
