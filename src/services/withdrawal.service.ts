import { axiosBase } from '@/api/interceptors'
import { NETWORK } from '@/types/deposit.type'
import {
	IFeeResponse,
	IWithdrawNumberRequest,
	IWithdrawTonRequest,
	IWithdrawUsdtRequest,
	IWithdrawUsernameRequest,
} from '@/types/withdrawal.type'

const WithdrawalService = {
	async getFee(network: NETWORK) {
		const response = await axiosBase.get<IFeeResponse>('/withdrawal/fee', {
			params: { network: network },
		})
		return response.data
	},

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
