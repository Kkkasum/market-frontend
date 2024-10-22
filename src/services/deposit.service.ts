import { axiosBase } from '@/api/interceptors'
import { IDepositAddressResponse } from '@/types/deposit.type'

const DepositService = {
	async getDepositAddress(network: string, userId: number) {
		const response = await axiosBase.get<IDepositAddressResponse>(
			`/deposit/${network}/${userId}`
		)
		return response.data
	},
}

export default DepositService
