import { axiosBase } from '@/api/interceptors'
import {
	IDepositAddressResponse,
	IRequisiteResponse,
} from '@/types/deposit.type'

const DepositService = {
	async getDepositAddress(network: string, userId: number) {
		const response = await axiosBase.get<IDepositAddressResponse>(
			`/deposit/crypto/${network}/${userId}`
		)
		return response.data
	},

	async getDepositRequisite(
		userId: number,
		amount: number,
		paymentType?: string
	) {
		const response = await axiosBase.get<IRequisiteResponse>(
			`/deposit/rub/${userId}`,
			{ params: { amount: amount, payment: paymentType } }
		)
		return response.data
	},
}

export default DepositService
