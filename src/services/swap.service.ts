import { axiosBase } from '@/api/interceptors'

const SwapService = {
	async getIsSwapAvailable() {
		const response = await axiosBase.get('/swap')
		return response.status
	},
}

export default SwapService
