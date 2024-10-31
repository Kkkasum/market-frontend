import { axiosBase } from '@/api/interceptors'
import { IAddSwapRequest } from '@/types/swap.type'

const SwapService = {
	async getIsSwapAvailable() {
		const response = await axiosBase.get('/swap')
		return response.data
	},

	async getSwapFee() {
		const response = await axiosBase.get('/swap/fee')
		return response.data
	},

	async addSwap(data: IAddSwapRequest) {
		const response = await axiosBase.post('/swap/add', data)
		return response.status
	},
}

export default SwapService
