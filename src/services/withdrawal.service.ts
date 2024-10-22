import { axiosBase } from '@/api/interceptors'
import {
	IWithdrawalNumberRequest,
	IWithdrawalTonRequest,
	IWithdrawalUsdtRequest,
	IWithdrawalUsernameRequest,
} from '@/types/withdrawal.type'

const WithdrawalService = {
	async withdrawUsdt(data: IWithdrawalUsdtRequest) {
		const response = await axiosBase.post('/withdrawal/usdt', data)
		return response.status
	},

	async withdrawTon(data: IWithdrawalTonRequest) {
		const response = await axiosBase.post('/withdrawal/ton', data)
		return response.status
	},

	async withdrawNumber(data: IWithdrawalNumberRequest) {
		const response = await axiosBase.post('/withdrawal/number', data)
		return response.status
	},

	async withdrawUsername(data: IWithdrawalUsernameRequest) {
		const response = await axiosBase.post('/withdrawal/username', data)
		return response.status
	},
}

export default WithdrawalService
