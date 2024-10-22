import { axiosBase } from '@/api/interceptors'
import {
	IWithdrawNumberRequest,
	IWithdrawTonRequest,
	IWithdrawUsdtRequest,
	IWithdrawUsernameRequest,
} from '@/types/withdrawal.type'

const WithdrawalService = {
	async withdrawUsdt(data: IWithdrawUsdtRequest) {
		const response = await axiosBase.post('/withdrawal/usdt', data)
		return response.status
	},

	async withdrawTon(data: IWithdrawTonRequest) {
		const response = await axiosBase.post('/withdrawal/ton', data)
		return response.status
	},

	async withdrawNumber(data: IWithdrawNumberRequest) {
		const response = await axiosBase.post('/withdrawal/number', data)
		return response.status
	},

	async withdrawUsername(data: IWithdrawUsernameRequest) {
		const response = await axiosBase.post('/withdrawal/username', data)
		return response.status
	},
}

export default WithdrawalService
