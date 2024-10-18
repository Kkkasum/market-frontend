import { axiosBase } from '@/api/interceptors'
import {
	IWithdrawNumberRequest,
	IWithdrawTokenRequest,
	IWithdrawUsernameRequest,
} from '@/types/withdraw.type'

const WithdrawService = {
	async withdrawToken(data: IWithdrawTokenRequest) {
		const response = await axiosBase.post('/user/withdraw/token', data)
		return response.status
	},

	async withdrawNumber(data: IWithdrawNumberRequest) {
		const response = await axiosBase.post('/user/withdraw/number', data)
		return response.status
	},

	async withdrawUsername(data: IWithdrawUsernameRequest) {
		const response = await axiosBase.post('/user/withdraw/token', data)
		return response.status
	},
}

export default WithdrawService
